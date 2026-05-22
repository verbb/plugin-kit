import { EditableTableColumn } from './types';
export declare const GENERATED_CELL_MODE: {
    readonly EMPTY: "empty";
    readonly AUTO: "auto";
    readonly MANUAL: "manual";
    readonly SEEDED: "seeded";
};
export declare const isGeneratedColumn: (column: EditableTableColumn) => string | false | undefined;
export declare const isThinColumn: (column: EditableTableColumn) => boolean;
export declare const getGeneratedCellKey: (rowId: string, columnName: string) => string;
export declare const isEmptyCellValue: (value: unknown) => value is "" | null | undefined;
//# sourceMappingURL=helpers.d.ts.map