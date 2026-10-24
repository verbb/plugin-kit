import { PropType } from 'vue';
import { DataTableAction, DataTableDataSource, DataTableColumn, DataTableKey, DataTableRow } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
/** Named cell slots project Vue content; the web component owns the table. */
export declare const DataTable: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<"client" | "remote">;
        default: string;
    };
    dataSource: {
        type: PropType<DataTableDataSource>;
        default: undefined;
    };
    rows: {
        type: PropType<DataTableRow[]>;
        default: () => never[];
    };
    columns: {
        type: PropType<DataTableColumn[]>;
        default: () => never[];
    };
    rowLabel: {
        type: PropType<string | ((row: DataTableRow) => string)>;
        default: undefined;
    };
    rowActions: {
        type: PropType<(row: DataTableRow) => DataTableAction[]>;
        default: undefined;
    };
    manualOrder: {
        type: BooleanConstructor;
        default: boolean;
    };
    reorderDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowKey: {
        type: PropType<string | ((row: DataTableRow) => DataTableKey)>;
        default: string;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<"client" | "remote">;
        default: string;
    };
    dataSource: {
        type: PropType<DataTableDataSource>;
        default: undefined;
    };
    rows: {
        type: PropType<DataTableRow[]>;
        default: () => never[];
    };
    columns: {
        type: PropType<DataTableColumn[]>;
        default: () => never[];
    };
    rowLabel: {
        type: PropType<string | ((row: DataTableRow) => string)>;
        default: undefined;
    };
    rowActions: {
        type: PropType<(row: DataTableRow) => DataTableAction[]>;
        default: undefined;
    };
    manualOrder: {
        type: BooleanConstructor;
        default: boolean;
    };
    reorderDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowKey: {
        type: PropType<string | ((row: DataTableRow) => DataTableKey)>;
        default: string;
    };
}>> & Readonly<{}>, {
    mode: "client" | "remote";
    dataSource: DataTableDataSource;
    rows: DataTableRow[];
    columns: DataTableColumn[];
    rowLabel: string | ((row: DataTableRow) => string);
    rowActions: (row: DataTableRow) => DataTableAction[];
    manualOrder: boolean;
    reorderDisabled: boolean;
    rowKey: string | ((row: DataTableRow) => DataTableKey);
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export declare const PkDataTableElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<"client" | "remote">;
        default: string;
    };
    dataSource: {
        type: PropType<DataTableDataSource>;
        default: undefined;
    };
    rows: {
        type: PropType<DataTableRow[]>;
        default: () => never[];
    };
    columns: {
        type: PropType<DataTableColumn[]>;
        default: () => never[];
    };
    rowLabel: {
        type: PropType<string | ((row: DataTableRow) => string)>;
        default: undefined;
    };
    rowActions: {
        type: PropType<(row: DataTableRow) => DataTableAction[]>;
        default: undefined;
    };
    manualOrder: {
        type: BooleanConstructor;
        default: boolean;
    };
    reorderDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowKey: {
        type: PropType<string | ((row: DataTableRow) => DataTableKey)>;
        default: string;
    };
}>, () => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<"client" | "remote">;
        default: string;
    };
    dataSource: {
        type: PropType<DataTableDataSource>;
        default: undefined;
    };
    rows: {
        type: PropType<DataTableRow[]>;
        default: () => never[];
    };
    columns: {
        type: PropType<DataTableColumn[]>;
        default: () => never[];
    };
    rowLabel: {
        type: PropType<string | ((row: DataTableRow) => string)>;
        default: undefined;
    };
    rowActions: {
        type: PropType<(row: DataTableRow) => DataTableAction[]>;
        default: undefined;
    };
    manualOrder: {
        type: BooleanConstructor;
        default: boolean;
    };
    reorderDisabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowKey: {
        type: PropType<string | ((row: DataTableRow) => DataTableKey)>;
        default: string;
    };
}>> & Readonly<{}>, {
    mode: "client" | "remote";
    dataSource: DataTableDataSource;
    rows: DataTableRow[];
    columns: DataTableColumn[];
    rowLabel: string | ((row: DataTableRow) => string);
    rowActions: (row: DataTableRow) => DataTableAction[];
    manualOrder: boolean;
    reorderDisabled: boolean;
    rowKey: string | ((row: DataTableRow) => DataTableKey);
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export type { DataTableRowReorderDetail, DataTableAction, DataTableActionPreset, DataTablePersistence, DataTablePersistenceOptions, DataTablePreferenceStorage, DataTableExportFormat, DataTableExportDetail, DataTableColumn, DataTableCellContext, DataTableDataSource, DataTableFilter, DataTableFilterOperator, DataTableKey, DataTableLabels, DataTableQuery, DataTableResult, DataTableRow, DataTableView, } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
export { persistDataTableView, defaultDataTableQuery, queryDataTable, DataTableRequestController, } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
//# sourceMappingURL=DataTable.d.ts.map