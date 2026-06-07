import { default as React } from 'react';
import { VariableCategories } from '../tiptap/VariableDropdown';
export type EditableTableRow = Record<string, unknown> & {
    _id: string;
};
export type EditableTableColumn = {
    name: string;
    type?: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    options?: unknown[];
    className?: string;
    contentClassName?: string;
    thin?: boolean;
    source?: string;
    allowUnselect?: boolean;
    noneOptionLabel?: string;
    showActionsMenu?: boolean;
    variableCategories?: VariableCategories;
    variableCategoryLabels?: Record<string, string>;
    variableCategoryOrder?: string[];
    onChange?: (newValue: unknown, row: EditableTableRow, columnName: string) => void;
    renderCell?: (args: EditableTableRenderCellArgs) => React.ReactNode;
    [key: string]: unknown;
};
export type EditableTableModifyColumn = (row: EditableTableRow, columnName: string) => Partial<EditableTableColumn> | null | undefined;
export type EditableTableModifyRow = (row: EditableTableRow, rowIndex: number) => {
    cellClassName?: string;
    title?: string;
} | null | undefined;
export type EditableTableRowActionArgs = {
    row: EditableTableRow;
    rowIndex: number;
    rowCount: number;
};
export type EditableTableOnCellChange = (rowIndex: number, columnName: string, value: unknown, row: EditableTableRow) => void;
export type EditableTableRenderCellArgs = {
    column: EditableTableColumn;
    value: unknown;
    row: EditableTableRow;
    rowIndex: number;
    isInvalid: boolean;
    updateValue: (newValue: unknown) => void;
    cellErrors: unknown[];
};
//# sourceMappingURL=types.d.ts.map