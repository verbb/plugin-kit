import {
    matchesDataTableFilter,
    type DataTableFilterOperator,
} from './filter-model.js';
export {
    dataTableFilterOperators,
    type DataTableFilterOperator,
} from './filter-model.js';
export { dataTableLabels, type DataTableLabels } from './labels.js';
import type { TemplateResult } from 'lit';
import type { PkStatusVariant } from '../status/pk-status.js';

export type DataTableRow = Record<string, unknown>;
export type DataTableKey = string | number;
export type DataTableSort = { id: string; direction: 'asc' | 'desc' };
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
export type DataTableView = { hiddenColumns: string[]; columnOrder: string[] };
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
    renderCell?: (
        context: DataTableCellContext,
    ) => TemplateResult | Node | string | number | null;
};
export type DataTableFilter = {
    id: string;
    label: string;
    type:
        | 'text'
        | 'select'
        | 'multi-select'
        | 'boolean'
        | 'number-range'
        | 'date-range';
    options?: { value: string; label: string }[];
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
export type DataTableDataSource = (
    query: DataTableQuery,
    options: { signal: AbortSignal },
) => Promise<DataTableResult>;
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
} & (
    | { preset: DataTableActionPreset; label?: string }
    | { preset?: never; label: string }
);
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
export const defaultDataTableQuery = (): DataTableQuery => ({
    search: '',
    sort: [],
    filters: {},
    pageIndex: 0,
    pageSize: 25,
});
export const dataTableCellSlot = (
    key: DataTableKey,
    columnId: string,
): string =>
    `cell-${typeof key}-${encodeURIComponent(String(key))}-${encodeURIComponent(columnId)}`;
export const dataTableValue = (
    row: DataTableRow,
    column: DataTableColumn,
): unknown => (column.value ? column.value(row) : row[column.id]);
export function dataTableText(value: unknown): string {
    return value == null
        ? ''
        : Array.isArray(value)
          ? value.join(', ')
          : String(value);
}

/** Bounded local datasets only; remote consumers perform these operations at their endpoint. */
export function queryDataTable(
    rows: DataTableRow[],
    columns: DataTableColumn[],
    filters: DataTableFilter[],
    query: DataTableQuery,
    locale?: string,
): DataTableResult {
    const search = query.search.trim().toLocaleLowerCase(locale);
    const matching = rows.filter((row) => {
        if (
            search &&
            !columns.some(
                (column) =>
                    column.searchable !== false &&
                    dataTableText(dataTableValue(row, column))
                        .toLocaleLowerCase(locale)
                        .includes(search),
            )
        )
            return false;
        return filters.every((filter) => {
            const expected = query.filters[filter.id];
            if (expected == null) return true;
            const value = filter.value ? filter.value(row) : row[filter.id];
            return matchesDataTableFilter(
                filter,
                value,
                expected,
                query.filterOperators?.[filter.id],
                locale,
            );
        });
    });
    const collator = new Intl.Collator(locale, {
        numeric: true,
        sensitivity: 'base',
    });
    matching.sort((a, b) => {
        for (const sort of query.sort) {
            const column = columns.find(
                (item) => item.id === sort.id && item.sortable,
            );
            if (!column) continue;
            const av = dataTableValue(a, column),
                bv = dataTableValue(b, column);
            const result =
                column.type === 'date'
                    ? (Date.parse(dataTableText(av)) || 0) -
                      (Date.parse(dataTableText(bv)) || 0)
                    : column.type === 'number' &&
                        Number.isFinite(Number(av)) &&
                        Number.isFinite(Number(bv))
                      ? Number(av) - Number(bv)
                      : typeof av === 'number' && typeof bv === 'number'
                        ? av - bv
                        : collator.compare(
                              dataTableText(av),
                              dataTableText(bv),
                          );
            if (result) return sort.direction === 'asc' ? result : -result;
        }
        return 0;
    });
    const start = query.pageIndex * query.pageSize;
    return {
        rows: matching.slice(start, start + query.pageSize),
        total: matching.length,
        hasNext: start + query.pageSize < matching.length,
    };
}

/** Cancellation alone is insufficient: a loader may ignore its AbortSignal. */
export class DataTableRequestController {
    private generation = 0;
    private abort?: AbortController;
    cancel(): void {
        this.generation++;
        this.abort?.abort();
    }
    async load(
        source: DataTableDataSource,
        query: DataTableQuery,
    ): Promise<DataTableResult | undefined> {
        this.cancel();
        const generation = this.generation;
        const abort = (this.abort = new AbortController());
        try {
            const result = await source(structuredClone(query), {
                signal: abort.signal,
            });
            return generation === this.generation ? result : undefined;
        } catch (error) {
            if (generation === this.generation) throw error;
            return undefined;
        }
    }
}
