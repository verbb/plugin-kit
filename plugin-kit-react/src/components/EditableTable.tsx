import React, { useCallback, useMemo } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { AutoScroller } from '@dnd-kit/dom';
import {
    Button,
    Table,
    TableHeader,
    TableBody,
    TableRow as UITableRow,
    TableHead,
} from '@verbb/plugin-kit-react/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { useTranslation } from '@verbb/plugin-kit-react/hooks';
import { cn } from '@verbb/plugin-kit-react/utils';
import { TableRow } from './editable-table/TableRow';
import { isGeneratedColumn, isThinColumn } from './editable-table/helpers';
import { useEditableTableRows } from './editable-table/useEditableTableRows';
import { useEditableTableDnd } from './editable-table/useEditableTableDnd';
import { useEditableTableCellChange } from './editable-table/useEditableTableCellChange';
import type {
    EditableTableColumn,
    EditableTableModifyColumn,
    EditableTableModifyRow,
    EditableTableOnCellChange,
    EditableTableRow,
    EditableTableRowActionArgs,
} from './editable-table/types';

export type {
    EditableTableColumn,
    EditableTableModifyColumn,
    EditableTableModifyColumnResult,
    EditableTableModifyRow,
    EditableTableOnCellChange,
    EditableTableRow,
    EditableTableRowActionArgs,
} from './editable-table/types';

export type EditableTableProps = {
    columns: EditableTableColumn[];
    rows: EditableTableRow[];
    onChange: (rows: EditableTableRow[]) => void;
    onCellChange?: EditableTableOnCellChange;
    addRowLabel?: string;
    allowReorder?: boolean;
    allowAdd?: boolean;
    allowDelete?: boolean;
    className?: string;
    modifyColumn?: EditableTableModifyColumn;
    modifyRow?: EditableTableModifyRow;
    fieldName?: string;
    cellErrors?: Record<string, unknown>;
    newRowDefaults?: Record<string, unknown>;
    renderActions?: (args: { rows: EditableTableRow[]; addRow: () => void; isDragging: boolean }) => React.ReactNode;
    renderRowActions?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItemsBeforeCore?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItemsAfterCore?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItems?: (args: EditableTableRowActionArgs) => React.ReactNode;
};

type TableRowComponentProps = {
    row: EditableTableRow;
    rowIndex: number;
    rowCount: number;
    columns: EditableTableColumn[];
    columnsSignature: string;
    useDnd: boolean;
    allowReorder: boolean;
    showReorderControls: boolean;
    allowDelete: boolean;
    modifyColumn?: EditableTableModifyColumn;
    modifyRow?: EditableTableModifyRow;
    getCellErrors: (rowIndex: number, columnName: string) => unknown[];
    onUpdateCell: (rowIndex: number, row: EditableTableRow, column: EditableTableColumn, newValue: unknown) => void;
    moveRow: (row: EditableTableRow, direction: number) => void;
    removeRow: (row: EditableTableRow) => void;
    t: (key: string) => string;
    renderRowActions?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItemsBeforeCore?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItemsAfterCore?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItems?: (args: EditableTableRowActionArgs) => React.ReactNode;
};

export function EditableTable({
    columns,
    rows,
    onChange,
    onCellChange = undefined,
    addRowLabel,
    allowReorder = true,
    allowAdd = true,
    allowDelete = true,
    className = '',
    modifyColumn = undefined,
    modifyRow = undefined,
    fieldName = undefined,
    cellErrors = {},
    newRowDefaults = {},
    renderActions = undefined,
    renderRowActions = undefined,
    renderRowMenuItemsBeforeCore = undefined,
    renderRowMenuItemsAfterCore = undefined,
    renderRowMenuItems = undefined,
}: EditableTableProps) {
    const TableRowComponent = TableRow as React.ComponentType<TableRowComponentProps>;
    const t = useTranslation();
    const normalizedColumns = useMemo(() => {
        const sourceColumns = Array.isArray(columns) ? columns : [];
        const validColumns = sourceColumns.filter((column) => {
            return typeof column?.name === 'string' && column.name.trim() !== '';
        });

        if (validColumns.length !== sourceColumns.length) {
            const invalidColumns = sourceColumns.filter((column) => {
                return !(typeof column?.name === 'string' && column.name.trim() !== '');
            });

            console.error(
                'EditableTable: column definitions must include a non-empty `name`.',
                { invalidColumns, columns: sourceColumns },
            );
        }

        return validColumns;
    }, [columns]);

    const generatedColumns = useMemo(() => {
        return normalizedColumns.filter(isGeneratedColumn);
    }, [normalizedColumns]);

    const columnsSignature = useMemo(() => {
        return JSON.stringify(normalizedColumns.map((column) => {
            return {
                name: column.name,
                type: column.type,
                label: column.label,
                required: column.required,
                placeholder: column.placeholder,
                options: column.options,
            };
        }));
    }, [normalizedColumns]);

    const {
        internalData,
        setInternalData,
        internalDataRef,
        skipNextRowsSyncRef,
        handleChange,
        addRow,
        removeRow,
        updateRow,
        moveRow,
    } = useEditableTableRows({
        rows,
        onChange,
        newRowDefaults,
    });

    const {
        isDragging,
        isDndHydrated,
        effectiveAllowReorder,
        handleDragStart,
        handleDragEnd,
    } = useEditableTableDnd({
        allowReorder,
        internalData,
        handleChange,
    });

    const {
        handleCellValueChange,
    } = useEditableTableCellChange({
        internalData,
        internalDataRef,
        setInternalData,
        skipNextRowsSyncRef,
        generatedColumns,
        onCellChange,
        updateRow,
        handleChange,
    });

    const getCellErrors = useCallback((rowIndex: number, columnName: string) => {
        if (!fieldName) {
            return [];
        }

        const key = `${fieldName}.${rowIndex}.${columnName}`;
        const errors = cellErrors?.[key];
        if (!errors) {
            return [];
        }

        return Array.isArray(errors) ? errors : [errors];
    }, [cellErrors, fieldName]);

    const actions = typeof renderActions === 'function'
        ? renderActions({
            rows: internalData,
            addRow,
            isDragging,
        })
        : null;

    const dragDropPlugins = useCallback((defaults) => {
        return defaults.filter((plugin) => { return plugin !== AutoScroller; });
    }, []);

    return (
        <div className={className}>
            {actions}

            <DragDropProvider
                plugins={dragDropPlugins}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <Table>
                    <TableHeader>
                        <UITableRow>
                            {normalizedColumns.map((column) => {
                                return (
                                    <TableHead key={column.name} className={cn(column.className, isThinColumn(column) && 'w-[1%] whitespace-nowrap')}>
                                        {column.label}
                                        {column.required && <span className="text-error ml-1">*</span>}
                                    </TableHead>
                                );
                            })}
                            {(allowReorder || allowDelete) && <TableHead className="p-0 w-0"></TableHead>}
                        </UITableRow>
                    </TableHeader>
                    <TableBody>
                        {internalData.map((row, rowIndex) => {
                            return (
                                <TableRowComponent
                                    key={row._id}
                                    row={row}
                                    rowIndex={rowIndex}
                                    rowCount={internalData.length}
                                    columns={normalizedColumns}
                                    columnsSignature={columnsSignature}
                                    useDnd={allowReorder && isDndHydrated}
                                    allowReorder={effectiveAllowReorder && isDndHydrated}
                                    showReorderControls={allowReorder}
                                    allowDelete={allowDelete}
                                    modifyColumn={modifyColumn}
                                    modifyRow={modifyRow}
                                    getCellErrors={getCellErrors}
                                    onUpdateCell={handleCellValueChange}
                                    moveRow={moveRow}
                                    removeRow={removeRow}
                                    t={t}
                                    renderRowActions={renderRowActions}
                                    renderRowMenuItemsBeforeCore={renderRowMenuItemsBeforeCore}
                                    renderRowMenuItemsAfterCore={renderRowMenuItemsAfterCore}
                                    renderRowMenuItems={renderRowMenuItems}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </DragDropProvider>

            {allowAdd && (
                <Button
                    type="button"
                    variant="dashed"
                    onClick={addRow}
                    className={cn('w-full rounded-t-none! border-t-0!', isDragging && 'pointer-events-none')}
                >
                    <FontAwesomeIcon icon={faPlus} className="size-3 mr-1" />
                    {addRowLabel || t('Add row')}
                </Button>
            )}
        </div>
    );
}
