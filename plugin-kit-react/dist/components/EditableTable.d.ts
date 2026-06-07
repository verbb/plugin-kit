import { default as React } from 'react';
import { EditableTableColumn, EditableTableModifyColumn, EditableTableModifyRow, EditableTableOnCellChange, EditableTableRow, EditableTableRowActionArgs } from './editable-table/types';
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
    renderActions?: (args: {
        rows: EditableTableRow[];
        addRow: () => void;
        isDragging: boolean;
    }) => React.ReactNode;
    renderRowActions?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItemsBeforeCore?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItemsAfterCore?: (args: EditableTableRowActionArgs) => React.ReactNode;
    renderRowMenuItems?: (args: EditableTableRowActionArgs) => React.ReactNode;
};
export declare function EditableTable({ columns, rows, onChange, onCellChange, addRowLabel, allowReorder, allowAdd, allowDelete, className, modifyColumn, modifyRow, fieldName, cellErrors, newRowDefaults, renderActions, renderRowActions, renderRowMenuItemsBeforeCore, renderRowMenuItemsAfterCore, renderRowMenuItems, }: EditableTableProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=EditableTable.d.ts.map