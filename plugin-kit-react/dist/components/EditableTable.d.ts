import { default as React, ReactNode } from 'react';
import { getCustomCellSlotName, PkEditableTable, PkEditableTableColumn, PkEditableTableColumnType, PkEditableTableGetRowMenuItems, PkEditableTableModifyColumn, PkEditableTableModifyRow, PkEditableTableOption, PkEditableTableRow, PkEditableTableRowMenuItem, PkEditableTableRowModifier } from '@verbb/plugin-kit-web/components/editable-table/pk-editable-table.js';
declare const PkEditableTableElement: import('@lit/react').ReactWebComponent<PkEditableTable, {
    onPkChange: string;
    onPkCellChange: string;
    onPkRowMenuSelect: string;
    onInput: string;
    onChange: string;
}>;
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
export type EditableTableProps = Omit<PkEditableTableElementProps, 'onChange' | 'columns' | 'modifyColumn' | 'modifyRow' | 'getRowMenuItems' | 'children'> & {
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
    modifyRow?: ((row: PkEditableTableRow, rowIndex: number) => PkEditableTableRowModifier | {
        cellClassName?: string;
        title?: string;
        tone?: PkEditableTableRowModifier['tone'];
    } | null | undefined) | null;
    getRowMenuItems?: PkEditableTableGetRowMenuItems | null;
    /**
     * @deprecated Prefer `getRowMenuItems`. Alias kept so Formie can migrate call sites.
     */
    renderRowMenuItemsBeforeCore?: PkEditableTableGetRowMenuItems | null;
    onRowMenuSelect?: (detail: EditableTableRowMenuSelectDetail) => void;
    /**
     * Accepted but not forwarded — the facade projects cells via `renderCell`, not
     * arbitrary children. Declared so it can be destructured away from element props.
     */
    children?: ReactNode;
};
/**
 * React facade over `<pk-editable-table>`.
 * Behavior and styles live in the web component; this layer adds React sugar
 * (`onChange`, `onCellChange`, `renderCell` light-DOM projection, `modifyRow`
 * className alias) without reimplementing the table.
 */
export declare const EditableTable: React.ForwardRefExoticComponent<Omit<EditableTableProps, "ref"> & React.RefAttributes<PkEditableTable>>;
export { PkEditableTableElement, getCustomCellSlotName };
export type { PkEditableTableColumn, PkEditableTableColumnType, PkEditableTableGetRowMenuItems, PkEditableTableModifyColumn, PkEditableTableModifyRow, PkEditableTableOption, PkEditableTableRow, PkEditableTableRowMenuItem, PkEditableTableRowModifier, };
/** @deprecated Use `PkEditableTableColumn` — alias kept for transitional imports. */
export type EditableTableColumnAlias = PkEditableTableColumn;
/** @deprecated Use `PkEditableTableRow` — alias kept for transitional imports. */
export type EditableTableRow = PkEditableTableRow;
//# sourceMappingURL=EditableTable.d.ts.map