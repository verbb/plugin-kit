import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import { EditableTableColumn, EditableTableOnCellChange, EditableTableRow } from './types';
type UseEditableTableCellChangeArgs = {
    internalData: EditableTableRow[];
    internalDataRef: MutableRefObject<EditableTableRow[]>;
    setInternalData: Dispatch<SetStateAction<EditableTableRow[]>>;
    skipNextRowsSyncRef: MutableRefObject<number>;
    generatedColumns: EditableTableColumn[];
    onCellChange?: EditableTableOnCellChange | null;
    updateRow: (row: EditableTableRow, updates: Record<string, unknown>) => void;
    handleChange: (rows: EditableTableRow[]) => void;
};
export declare const useEditableTableCellChange: ({ internalData, internalDataRef, setInternalData, skipNextRowsSyncRef, generatedColumns, onCellChange, updateRow, handleChange, }: UseEditableTableCellChangeArgs) => {
    handleCellValueChange: (rowIndex: number, row: EditableTableRow, column: EditableTableColumn, newValue: unknown) => void;
};
export {};
//# sourceMappingURL=useEditableTableCellChange.d.ts.map