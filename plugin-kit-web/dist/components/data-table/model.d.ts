import { DataTableFilterOperator } from './filter-model.js';
import { TemplateResult } from 'lit';
import { PkStatusVariant } from '../status/pk-status.js';
export { dataTableFilterOperators, type DataTableFilterOperator, } from './filter-model.js';
export type DataTableRow = Record<string, unknown>;
export type DataTableKey = string | number;
export type DataTableSort = {
    id: string;
    direction: 'asc' | 'desc';
};
export type DataTableFilterValue = string | string[];
export type DataTableQuery = {
    search: string;
    sort: DataTableSort[];
    filters: Record<string, DataTableFilterValue>;
    /** Optional comparisons; omitted entries use the filter type’s default operator. */
    filterOperators?: Record<string, DataTableFilterOperator>;
    pageIndex: number;
    pageSize: number;
    cursor?: string;
    /** Consumer-owned, serialisable remote criteria (for example Craft conditions). */
    criteria?: Record<string, unknown>;
};
export type DataTableView = {
    hiddenColumns: string[];
    columnOrder: string[];
};
export type DataTableCellContext = {
    row: DataTableRow;
    column: DataTableColumn;
    value: unknown;
    rowKey: DataTableKey;
};
export type DataTableColumn = {
    id: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'status' | 'link' | 'handle' | 'custom';
    value?: (row: DataTableRow) => unknown;
    sortable?: boolean;
    searchable?: boolean;
    hideable?: boolean;
    align?: 'start' | 'center' | 'end';
    /** Preferred column width; content and the table's automatic layout can make it wider. */
    width?: string;
    /** Text/custom cells wrap by default; links truncate, and dates/numbers/statuses/handles stay on one line. */
    wrap?: boolean;
    numberOptions?: Intl.NumberFormatOptions;
    dateOptions?: Intl.DateTimeFormatOptions;
    /** StatusLabel colour defaults to the cell value; the cell value remains the visible badge label. */
    status?: (row: DataTableRow) => PkStatusVariant;
    href?: (row: DataTableRow) => string;
    /** Lit content for web consumers. React and Vue project their own cell content. */
    renderCell?: (context: DataTableCellContext) => TemplateResult | Node | string | number | null;
};
export type DataTableFilter = {
    id: string;
    label: string;
    type: 'text' | 'select' | 'multi-select' | 'boolean' | 'number-range' | 'date-range';
    options?: {
        value: string;
        label: string;
    }[];
    value?: (row: DataTableRow) => unknown;
    /** Limit comparisons to a supported subset; the first is the default. */
    operators?: DataTableFilterOperator[];
};
export type DataTableResult = {
    rows: DataTableRow[];
    total?: number;
    hasNext?: boolean;
    nextCursor?: string;
    previousCursor?: string;
};
export type DataTableDataSource = (query: DataTableQuery, options: {
    signal: AbortSignal;
}) => Promise<DataTableResult>;
export type DataTableActionPreset = 'edit' | 'move' | 'delete';
export type DataTableRowReorderDetail = {
    rowKey: DataTableKey;
    /** Zero-based positions within the displayed page. */
    fromIndex: number;
    toIndex: number;
    /** Only the displayed page, never an implied order for all remote records. */
    orderedKeys: DataTableKey[];
    previousKeys: DataTableKey[];
    /** Complete local rows in client mode; current-page rows in remote mode. */
    rows: DataTableRow[];
    previousRows: DataTableRow[];
    query: DataTableQuery;
};
export type DataTableAction = {
    id: string;
    disabled?: boolean;
    /** Presets appear as inline icon buttons by default. Custom actions stay in the menu. */
    display?: 'inline' | 'menu';
} & ({
    preset: DataTableActionPreset;
    label?: string;
} | {
    preset?: never;
    label: string;
});
export type DataTableExportFormat = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type DataTableExportDetail = {
    format: string;
    query: DataTableQuery;
    view: DataTableView;
    columnIds: string[];
    selectedKeys: DataTableKey[];
};
export type DataTableLabels = typeof dataTableLabels;
export declare const dataTableLabels: {
    search: string;
    clearSearch: string;
    pagination: string;
    scrollColumns: string;
    sortDirection: string;
    filters: string;
    filterResults: string;
    addFilter: string;
    allFiltersAdded: string;
    filterMatch: string;
    filterType: string;
    filterOperator: string;
    removeFilter: string;
    applyFilters: string;
    cancelFilters: string;
    filterRangeError: string;
    filterValueError: string;
    filterContains: string;
    filterNotContains: string;
    filterEquals: string;
    filterNotEquals: string;
    filterStartsWith: string;
    filterEndsWith: string;
    filterIn: string;
    filterNotIn: string;
    filterBetween: string;
    filterGreaterThan: string;
    filterAtLeast: string;
    filterLessThan: string;
    filterAtMost: string;
    filterAfter: string;
    filterOnOrAfter: string;
    filterBefore: string;
    filterOnOrBefore: string;
    filterEmpty: string;
    filterNotEmpty: string;
    columns: string;
    view: string;
    sortBy: string;
    defaultOrder: string;
    ascending: string;
    descending: string;
    defaults: string;
    close: string;
    reorder: string;
    reorderHelp: string;
    reordered: string;
    export: string;
    exporting: string;
    clear: string;
    all: string;
    yes: string;
    no: string;
    from: string;
    to: string;
    previous: string;
    next: string;
    empty: string;
    noResults: string;
    loading: string;
    updating: string;
    error: string;
    retry: string;
    selectPage: string;
    selectRow: string;
    selected: string;
    range: string;
    unknownRange: string;
    actions: string;
    editAction: string;
    moveAction: string;
    deleteAction: string;
    rowAction: string;
    copyHandle: string;
    copiedHandle: string;
    rowOrder: string;
    reorderRow: string;
    reorderRowHelp: string;
    reorderRowsFiltered: string;
    rowReordered: string;
    rowReorderCancelled: string;
    moveUp: string;
    moveDown: string;
    sort: string;
};
export declare const defaultDataTableQuery: () => DataTableQuery;
export declare const dataTableCellSlot: (key: DataTableKey, columnId: string) => string;
export declare const dataTableValue: (row: DataTableRow, column: DataTableColumn) => unknown;
export declare function dataTableText(value: unknown): string;
/** Bounded local datasets only; remote consumers perform these operations at their endpoint. */
export declare function queryDataTable(rows: DataTableRow[], columns: DataTableColumn[], filters: DataTableFilter[], query: DataTableQuery, locale?: string): DataTableResult;
/** Cancellation alone is insufficient: a loader may ignore its AbortSignal. */
export declare class DataTableRequestController {
    private generation;
    private abort?;
    cancel(): void;
    load(source: DataTableDataSource, query: DataTableQuery): Promise<DataTableResult | undefined>;
}
//# sourceMappingURL=model.d.ts.map