import React, { forwardRef, useState, type ReactNode } from 'react';
import { createPluginKitComponent } from '../utils/create-plugin-kit-component.js';
import {
    PkDataTable,
    dataTableCellSlot,
    dataTableValue,
    type DataTableColumn,
    type DataTableCellContext,
    type DataTableResult,
    type DataTableRow,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';

export const PkDataTableElement = createPluginKitComponent({
    tagName: 'pk-data-table',
    elementClass: PkDataTable,
    react: React,
    events: {
        onPkQueryChange: 'pk-query-change',
        onPkViewChange: 'pk-view-change',
        onPkSelectionChange: 'pk-selection-change',
        onPkRowAction: 'pk-row-action',
        onPkLoad: 'pk-load',
        onPkLoadError: 'pk-load-error',
        onPkRetry: 'pk-retry',
        onPkExport: 'pk-export',
    },
});
export type DataTableReactColumn = Omit<DataTableColumn, 'renderCell'> & {
    renderCell?: (context: DataTableCellContext) => ReactNode;
};
export type DataTableProps = Omit<
    React.ComponentProps<typeof PkDataTableElement>,
    'columns'
> & { columns?: DataTableReactColumn[] };

/** Only projects React cells; all table state and behaviour remain canonical. */
export const DataTable = forwardRef<PkDataTable, DataTableProps>(
    function DataTable(
        {
            columns = [],
            rows = [],
            rowKey = 'id',
            children,
            onPkLoad,
            ...props
        },
        ref,
    ) {
        const [loadedRows, setLoadedRows] = useState<DataTableRow[]>([]);
        const canonicalColumns: DataTableColumn[] = columns.map(
            ({ renderCell, ...column }) => ({
                ...column,
                ...(renderCell ? { type: 'custom' as const } : {}),
            }),
        );
        const displayedRows =
            props.mode === 'remote' && props.dataSource ? loadedRows : rows;
        return (
            <PkDataTableElement
                {...props}
                ref={ref}
                columns={canonicalColumns}
                rows={rows}
                rowKey={rowKey}
                onPkLoad={(event: Event) => {
                    setLoadedRows(
                        (event as CustomEvent<{ result: DataTableResult }>)
                            .detail.result.rows,
                    );
                    onPkLoad?.(event);
                }}
            >
                {children}
                {displayedRows.map((row) =>
                    columns
                        .filter((column) => column.renderCell)
                        .map((column) => {
                            const key =
                                typeof rowKey === 'function'
                                    ? rowKey(row)
                                    : (row[rowKey] as string | number);
                            const slot = dataTableCellSlot(key, column.id);
                            const canonical = canonicalColumns.find(
                                (item) => item.id === column.id,
                            )!;
                            return (
                                <span key={slot} slot={slot}>
                                    {column.renderCell?.({
                                        row,
                                        column: canonical,
                                        value: dataTableValue(row, canonical),
                                        rowKey: key,
                                    })}
                                </span>
                            );
                        }),
                )}
            </PkDataTableElement>
        );
    },
);
export type {
    DataTablePersistence,
    DataTablePersistenceOptions,
    DataTablePreferenceStorage,
    DataTableExportFormat,
    DataTableExportDetail,
    DataTableColumn,
    DataTableCellContext,
    DataTableDataSource,
    DataTableFilter,
    DataTableFilterOperator,
    DataTableKey,
    DataTableLabels,
    DataTableQuery,
    DataTableResult,
    DataTableRow,
    DataTableView,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
export {
    persistDataTableView,
    defaultDataTableQuery,
    queryDataTable,
    DataTableRequestController,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
