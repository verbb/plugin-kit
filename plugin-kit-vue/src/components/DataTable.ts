import { defineComponent, h, shallowRef, type PropType } from 'vue';
import {
    dataTableCellSlot,
    dataTableValue,
    type DataTableDataSource,
    type DataTableColumn,
    type DataTableKey,
    type DataTableResult,
    type DataTableRow,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';

/** Named cell slots project Vue content; the web component owns the table. */
export const DataTable = defineComponent({
    name: 'PkDataTable',
    inheritAttrs: false,
    props: {
        mode: {
            type: String as PropType<'client' | 'remote'>,
            default: 'client',
        },
        dataSource: {
            type: Function as PropType<DataTableDataSource>,
            default: undefined,
        },
        rows: { type: Array as PropType<DataTableRow[]>, default: () => [] },
        columns: {
            type: Array as PropType<DataTableColumn[]>,
            default: () => [],
        },
        rowLabel: {
            type: [String, Function] as PropType<
                string | ((row: DataTableRow) => string)
            >,
            default: undefined,
        },
        rowKey: {
            type: [String, Function] as PropType<
                string | ((row: DataTableRow) => DataTableKey)
            >,
            default: 'id',
        },
    },
    setup(props, { attrs, slots }) {
        const loadedRows = shallowRef<DataTableRow[]>([]);
        return () => {
            const columns = props.columns.map((column) => ({
                ...column,
                ...(slots[`cell-${column.id}`]
                    ? { type: 'custom' as const, renderCell: undefined }
                    : {}),
            }));
            const rows =
                props.mode === 'remote' && props.dataSource
                    ? loadedRows.value
                    : props.rows;
            return h(
                'pk-data-table',
                {
                    ...attrs,
                    mode: props.mode,
                    dataSource: props.dataSource,
                    rows: props.rows,
                    columns,
                    rowKey: props.rowKey,
                    rowLabel: props.rowLabel,
                    'onPk-load': (
                        event: CustomEvent<{ result: DataTableResult }>,
                    ) => {
                        loadedRows.value = event.detail.result.rows;
                        const listener = attrs['onPk-load'];
                        if (typeof listener === 'function') listener(event);
                    },
                },
                [
                    ...Object.entries(slots)
                        .filter(([name]) => !name.startsWith('cell-'))
                        .map(([name, slot]) =>
                            h(
                                'span',
                                name === 'default' ? {} : { slot: name },
                                slot?.(),
                            ),
                        ),
                    ...rows.flatMap((row) =>
                        columns
                            .filter((column) => slots[`cell-${column.id}`])
                            .map((column) => {
                                const key =
                                    typeof props.rowKey === 'function'
                                        ? props.rowKey(row)
                                        : (row[props.rowKey] as DataTableKey);
                                const slot = dataTableCellSlot(key, column.id);
                                return h(
                                    'span',
                                    { key: slot, slot },
                                    slots[`cell-${column.id}`]?.({
                                        row,
                                        column,
                                        rowKey: key,
                                        value: dataTableValue(row, column),
                                    }),
                                );
                            }),
                    ),
                ],
            );
        };
    },
});
export const PkDataTableElement = DataTable;
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
