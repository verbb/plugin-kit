import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    type ReactNode,
} from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    getCustomCellSlotName,
    isCustomColumn,
    nextRowId,
    PkEditableTable,
    type PkEditableTableColumn,
    type PkEditableTableColumnType,
    type PkEditableTableGetRowMenuItems,
    type PkEditableTableModifyColumn,
    type PkEditableTableModifyRow,
    type PkEditableTableOption,
    type PkEditableTableRow,
    type PkEditableTableRowMenuItem,
    type PkEditableTableRowModifier,
} from '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';

const PkEditableTableElement = createPluginKitComponent({
    tagName: 'pk-editable-table',
    elementClass: PkEditableTable,
    react: React,
    events: {
        onPkChange: 'pk-change',
        onPkCellChange: 'pk-cell-change',
        onPkRowMenuSelect: 'pk-row-menu-select',
        onInput: 'input',
        onChange: 'change',
    },
});

type PkEditableTableElementProps = React.ComponentProps<typeof PkEditableTableElement>;

export type EditableTableCellRenderContext = {
    column: EditableTableColumn;
    row: PkEditableTableRow;
    rowIndex: number;
    value: unknown;
    isInvalid: boolean;
    updateValue: (next: unknown) => void;
};

/**
 * Column shape for the React facade. Extra keys (Formie metadata, `renderCell`,
 * `className`) are stripped / remapped before forwarding to the web component.
 */
export type EditableTableColumn = Omit<PkEditableTableColumn, 'type' | 'class'> & {
    type?: PkEditableTableColumnType | (string & {});
    /** Maps to the CE `class` field. */
    className?: string;
    class?: string;
    /**
     * Optional class on the light-DOM projection wrapper for custom cells.
     * Built-in cell types ignore this (shadow cells cannot take host Tailwind).
     */
    contentClassName?: string;
    /** When set, the column is forced to `type: 'custom'` and content is projected. */
    renderCell?: (context: EditableTableCellRenderContext) => ReactNode;
};

export type EditableTableRowMenuSelectDetail = {
    rowIndex: number;
    row: PkEditableTableRow;
    item: PkEditableTableRowMenuItem;
    action: string;
    value: string;
};

export type EditableTableProps = Omit<
    PkEditableTableElementProps,
    'onChange' | 'columns' | 'modifyColumn' | 'modifyRow' | 'getRowMenuItems' | 'children'
> & {
    columns?: EditableTableColumn[];
    /**
     * Controlled rows callback — sugar over `onPkChange` detail.
     * Prefer this in React apps; `onPkChange` remains for CE parity.
     */
    onChange?: (rows: PkEditableTableRow[]) => void;
    /**
     * Per-cell sugar over `pk-cell-change`.
     * Signature matches Formie's historical `(rowIndex, columnName, value)` binding.
     */
    onCellChange?: (rowIndex: number, columnName: string, value: unknown, row?: PkEditableTableRow) => void;
    modifyColumn?: PkEditableTableModifyColumn | null;
    /**
     * Per-row chrome. Accepts CE shape (`class` / `title`) or Formie's
     * transitional `{ cellClassName, title }`.
     */
    modifyRow?: ((
        row: PkEditableTableRow,
        rowIndex: number,
    ) => PkEditableTableRowModifier | { cellClassName?: string; title?: string; tone?: PkEditableTableRowModifier['tone'] } | null | undefined) | null;
    getRowMenuItems?: PkEditableTableGetRowMenuItems | null;
    /**
     * @deprecated Prefer `getRowMenuItems`. Alias kept so Formie can migrate call sites.
     */
    renderRowMenuItemsBeforeCore?: PkEditableTableGetRowMenuItems | null;
    onRowMenuSelect?: (detail: EditableTableRowMenuSelectDetail) => void;
};

function optionalBoolean(name: 'allowAdd' | 'allowDelete' | 'allowReorder', value: boolean | undefined) {
    // Defaults live on the CE (`true`). Only forward when the caller sets a value —
    // including `false`, which `trueBooleanProps` would drop.
    if (value === undefined) {
        return {};
    }

    return { [name]: value };
}

function cellHasError(
    cellErrors: Record<string, string[] | string> | undefined,
    fieldName: string | undefined,
    rowIndex: number,
    columnName: string,
): boolean {
    if (!cellErrors) {
        return false;
    }

    const prefixed = fieldName ? cellErrors[`${fieldName}.${rowIndex}.${columnName}`] : undefined;
    const bare = cellErrors[`${rowIndex}.${columnName}`];
    const errors = prefixed ?? bare;
    if (!errors) {
        return false;
    }

    return Array.isArray(errors) ? errors.length > 0 : Boolean(errors);
}

function normalizeColumnsForElement(columns: EditableTableColumn[] | undefined): PkEditableTableColumn[] {
    if (!Array.isArray(columns)) {
        return [];
    }

    return columns.map((column) => {
        const forceCustom = typeof column.renderCell === 'function'
            || column.type === 'custom'
            || (typeof column.type === 'string'
                && column.type !== ''
                && isCustomColumn({ name: String(column.name), type: column.type as PkEditableTableColumnType }));

        return {
            name: String(column.name),
            type: (forceCustom ? 'custom' : (column.type as PkEditableTableColumnType | undefined)) || 'text',
            label: column.label,
            required: column.required,
            placeholder: column.placeholder,
            width: column.width,
            thin: column.thin,
            options: column.options,
            source: column.source,
            allowUnselect: column.allowUnselect,
            class: column.class || column.className || undefined,
        };
    });
}

function wrapModifyRow(
    modifyRow: EditableTableProps['modifyRow'],
): PkEditableTableModifyRow | null {
    if (!modifyRow) {
        return null;
    }

    return (row, rowIndex) => {
        const result = modifyRow(row, rowIndex);
        if (!result || typeof result !== 'object') {
            return result ?? undefined;
        }

        if ('cellClassName' in result || 'tone' in result) {
            const typed = result as {
                cellClassName?: string;
                title?: string;
                class?: string;
                tone?: PkEditableTableRowModifier['tone'];
            };
            return {
                class: typed.class || typed.cellClassName,
                title: typed.title,
                tone: typed.tone,
            };
        }

        return result as PkEditableTableRowModifier;
    };
}

/**
 * Keep stable `_id`s for slotted custom cells. The CE also mints ids, but React
 * projections key slots from the rows prop — without ids on first paint, TipTap
 * cells would mount empty until the next pk-change.
 */
function ensureRowIds(
    rows: PkEditableTableRow[] | undefined,
    previousIds: string[],
): { rows: PkEditableTableRow[]; ids: string[]; minted: boolean } {
    if (!Array.isArray(rows)) {
        return { rows: [], ids: [], minted: false };
    }

    let minted = false;
    const ids: string[] = [];
    const nextRows = rows.map((row, index) => {
        if (typeof row._id === 'string' && row._id !== '') {
            ids[index] = row._id;
            return row;
        }

        const reused = previousIds[index];
        const id = reused || nextRowId();
        if (!reused) {
            minted = true;
        }
        ids[index] = id;
        return { ...row, _id: id };
    });

    return { rows: nextRows, ids, minted };
}

/**
 * React facade over `<pk-editable-table>`.
 * Behavior and styles live in the web component; this layer adds React sugar
 * (`onChange`, `onCellChange`, `renderCell` light-DOM projection, `modifyRow`
 * className alias) without reimplementing the table.
 */
export const EditableTable = forwardRef<PkEditableTable, EditableTableProps>(function EditableTable(
    {
        allowAdd,
        allowDelete,
        allowReorder,
        columns,
        rows,
        cellErrors,
        fieldName,
        onChange,
        onCellChange,
        onPkChange,
        onPkCellChange,
        onPkRowMenuSelect,
        onRowMenuSelect,
        modifyColumn,
        modifyRow,
        getRowMenuItems,
        renderRowMenuItemsBeforeCore,
        children,
        ...rest
    },
    ref,
) {
    const elementRef = useRef<PkEditableTable | null>(null);
    const rowIdsRef = useRef<string[]>([]);

    useImperativeHandle(ref, () => elementRef.current as PkEditableTable, []);

    const { rows: rowsWithIds, ids: nextIds, minted } = useMemo(
        () => ensureRowIds(rows as PkEditableTableRow[] | undefined, rowIdsRef.current),
        [rows],
    );
    rowIdsRef.current = nextIds;

    // Push minted ids into controlled state so subsequent renders stay stable.
    useEffect(() => {
        if (!minted || !onChange) {
            return;
        }

        onChange(rowsWithIds);
    }, [minted, onChange, rowsWithIds]);

    const elementColumns = useMemo(() => normalizeColumnsForElement(columns), [columns]);
    const resolvedGetRowMenuItems = getRowMenuItems ?? renderRowMenuItemsBeforeCore ?? null;
    const resolvedModifyRow = useMemo(() => wrapModifyRow(modifyRow), [modifyRow]);

    const handlePkChange = useCallback(
        (event: Event) => {
            onPkChange?.(event as Parameters<NonNullable<PkEditableTableElementProps['onPkChange']>>[0]);
            if (!onChange) {
                return;
            }

            const detail = (event as CustomEvent<{ rows: PkEditableTableRow[] }>).detail;
            if (detail?.rows) {
                onChange(detail.rows);
            }
        },
        [onChange, onPkChange],
    );

    const handlePkCellChange = useCallback(
        (event: Event) => {
            onPkCellChange?.(event as Parameters<NonNullable<PkEditableTableElementProps['onPkCellChange']>>[0]);
            if (!onCellChange) {
                return;
            }

            const detail = (event as CustomEvent<{
                rowIndex: number;
                columnName: string;
                value: unknown;
                row: PkEditableTableRow;
            }>).detail;
            if (!detail) {
                return;
            }

            onCellChange(detail.rowIndex, detail.columnName, detail.value, detail.row);
        },
        [onCellChange, onPkCellChange],
    );

    const handlePkRowMenuSelect = useCallback(
        (event: Event) => {
            onPkRowMenuSelect?.(event as Parameters<NonNullable<PkEditableTableElementProps['onPkRowMenuSelect']>>[0]);
            if (!onRowMenuSelect) {
                return;
            }

            const detail = (event as CustomEvent<EditableTableRowMenuSelectDetail>).detail;
            if (detail) {
                onRowMenuSelect(detail);
            }
        },
        [onPkRowMenuSelect, onRowMenuSelect],
    );

    const customCellProjections = useMemo(() => {
        if (!Array.isArray(columns) || rowsWithIds.length === 0) {
            return null;
        }

        const projections: ReactNode[] = [];

        rowsWithIds.forEach((row, rowIndex) => {
            const rowId = String(row._id);
            columns.forEach((column) => {
                if (typeof column.renderCell !== 'function') {
                    return;
                }

                const columnName = String(column.name);
                const slotName = getCustomCellSlotName(rowId, columnName);
                const isInvalid = cellHasError(
                    cellErrors as Record<string, string[] | string> | undefined,
                    typeof fieldName === 'string' ? fieldName : undefined,
                    rowIndex,
                    columnName,
                );

                projections.push(
                    <div
                        key={slotName}
                        slot={slotName}
                        className={typeof column.contentClassName === 'string' ? column.contentClassName : undefined}
                    >
                        {column.renderCell({
                            column,
                            row,
                            rowIndex,
                            value: row[columnName],
                            isInvalid,
                            updateValue: (next) => {
                                elementRef.current?.setCellValue(rowIndex, columnName, next);
                            },
                        })}
                    </div>,
                );
            });
        });

        return projections.length > 0 ? projections : null;
    }, [cellErrors, columns, fieldName, rowsWithIds]);

    return (
        <PkEditableTableElement
            ref={elementRef}
            {...rest}
            columns={elementColumns}
            rows={rowsWithIds}
            cellErrors={cellErrors}
            fieldName={fieldName}
            modifyColumn={modifyColumn ?? null}
            modifyRow={resolvedModifyRow}
            getRowMenuItems={resolvedGetRowMenuItems}
            {...optionalBoolean('allowAdd', allowAdd)}
            {...optionalBoolean('allowDelete', allowDelete)}
            {...optionalBoolean('allowReorder', allowReorder)}
            {...(onChange || onPkChange ? { onPkChange: handlePkChange } : {})}
            {...(onCellChange || onPkCellChange ? { onPkCellChange: handlePkCellChange } : {})}
            {...(onRowMenuSelect || onPkRowMenuSelect ? { onPkRowMenuSelect: handlePkRowMenuSelect } : {})}
        >
            {customCellProjections}
            {children}
        </PkEditableTableElement>
    );
});

EditableTable.displayName = 'EditableTable';

export { PkEditableTableElement, getCustomCellSlotName };
export type {
    PkEditableTableColumn,
    PkEditableTableColumnType,
    PkEditableTableGetRowMenuItems,
    PkEditableTableModifyColumn,
    PkEditableTableModifyRow,
    PkEditableTableOption,
    PkEditableTableRow,
    PkEditableTableRowMenuItem,
    PkEditableTableRowModifier,
};

/** @deprecated Use `PkEditableTableColumn` — alias kept for transitional imports. */
export type EditableTableColumnAlias = PkEditableTableColumn;
/** @deprecated Use `PkEditableTableRow` — alias kept for transitional imports. */
export type EditableTableRow = PkEditableTableRow;
