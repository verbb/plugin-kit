import { EditableTableRow } from './types';
export declare const useEditableTableRows: ({ rows, onChange, newRowDefaults, }: {
    rows: EditableTableRow[];
    onChange: (rows: EditableTableRow[]) => void;
    newRowDefaults?: Record<string, unknown>;
}) => {
    internalData: EditableTableRow[];
    setInternalData: import('react').Dispatch<import('react').SetStateAction<EditableTableRow[]>>;
    internalDataRef: import('react').RefObject<EditableTableRow[]>;
    skipNextRowsSyncRef: import('react').RefObject<number>;
    handleChange: (nextRows: EditableTableRow[]) => void;
    addRow: () => void;
    removeRow: (row: EditableTableRow) => void;
    updateRow: (row: EditableTableRow, updates: Record<string, unknown>) => void;
    moveRow: (row: EditableTableRow, direction: number) => void;
};
//# sourceMappingURL=useEditableTableRows.d.ts.map