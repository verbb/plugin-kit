import { EditableTableColumn, EditableTableModifyColumn, EditableTableRow } from './types';
type Props = {
    column: EditableTableColumn;
    value: unknown;
    row: EditableTableRow;
    rowIndex: number;
    modifyColumn?: EditableTableModifyColumn | null;
    getCellErrors: (rowIndex: number, columnName: string) => unknown[];
    onUpdateCell: (rowIndex: number, row: EditableTableRow, column: EditableTableColumn, newValue: unknown) => void;
};
export declare function TableCell({ column, value, row, rowIndex, modifyColumn, getCellErrors, onUpdateCell, }: Props): string | number | bigint | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import('react').ReactNode> | Promise<string | number | bigint | boolean | import('react').ReactPortal | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<import('react').ReactNode> | null | undefined> | null | undefined;
export {};
//# sourceMappingURL=TableCell.d.ts.map