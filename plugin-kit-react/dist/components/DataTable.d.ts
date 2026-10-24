import { default as React, ReactNode } from 'react';
import { PkDataTable, DataTableColumn, DataTableCellContext } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
export declare const PkDataTableElement: import('@lit/react').ReactWebComponent<PkDataTable, {
    onPkQueryChange: string;
    onPkViewChange: string;
    onPkSelectionChange: string;
    onPkRowAction: string;
    onPkRowReorder: string;
    onPkLoad: string;
    onPkLoadError: string;
    onPkRetry: string;
    onPkExport: string;
}>;
export type DataTableReactColumn = Omit<DataTableColumn, 'renderCell'> & {
    renderCell?: (context: DataTableCellContext) => ReactNode;
};
export type DataTableProps = Omit<React.ComponentProps<typeof PkDataTableElement>, 'columns'> & {
    columns?: DataTableReactColumn[];
};
/** Only projects React cells; all table state and behaviour remain canonical. */
export declare const DataTable: React.ForwardRefExoticComponent<Omit<DataTableProps, "ref"> & React.RefAttributes<PkDataTable>>;
export type { DataTableRowReorderDetail, DataTableAction, DataTableActionPreset, DataTablePersistence, DataTablePersistenceOptions, DataTablePreferenceStorage, DataTableExportFormat, DataTableExportDetail, DataTableColumn, DataTableCellContext, DataTableDataSource, DataTableFilter, DataTableFilterOperator, DataTableKey, DataTableLabels, DataTableQuery, DataTableResult, DataTableRow, DataTableView, } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
export { persistDataTableView, defaultDataTableQuery, queryDataTable, DataTableRequestController, } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
//# sourceMappingURL=DataTable.d.ts.map