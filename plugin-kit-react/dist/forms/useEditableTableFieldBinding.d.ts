import { SchemaFormEngineApi } from './engine/context';
type EditableTableBindingForm = SchemaFormEngineApi & {
    recomputeGroupedErrorsForPath?: (path: string) => void;
};
export declare const useEditableTableFieldBinding: (form: EditableTableBindingForm, fieldName: string) => {
    rows: any[];
    setRows: (nextValue: unknown) => void;
    errors: string[];
    cellErrors: {};
    handleCellChange: (rowIndex: number, columnName: string, nextValue: unknown) => void;
};
export {};
//# sourceMappingURL=useEditableTableFieldBinding.d.ts.map