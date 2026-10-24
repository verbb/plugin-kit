import type { PkDataTable } from './pk-data-table.js';
import type { DataTableColumn, DataTableSort, DataTableView } from './model.js';

export type DataTablePreferenceStorage = Pick<
    Storage,
    'getItem' | 'setItem' | 'removeItem'
>;

export interface DataTablePersistenceOptions {
    /** Stable table identity. Include site/context here when preferences should differ. */
    key: string;
    /** Current account identity; never share preferences between users on the same browser. */
    userId: string | number;
    /** Bump when the consumer's preference schema changes incompatibly. */
    version?: string | number;
    /** False keeps the supplied query sort, for example when the URL specifies one. */
    restoreSort?: boolean;
    /** Defaults to the table document's localStorage. Access failures are ignored. */
    storage?: DataTablePreferenceStorage;
}

export interface DataTablePersistence {
    readonly storageKey: string;
    /** Remove saved preferences without changing the current table. */
    clear(): void;
    /** Stop listening; call when disposing of the table or changing the account/key. */
    disconnect(): void;
}

type Preferences = { view: DataTableView; sort: DataTableSort[] };
const bindings = new WeakMap<PkDataTable, DataTablePersistence>();
const record = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

function cleanView(
    value: unknown,
    columns: DataTableColumn[],
    fallback: DataTableView,
): DataTableView {
    const source = record(value) ? value : fallback;
    const ids = columns.map((column) => column.id);
    const list = (value: unknown, fallback: string[]) => [
        ...new Set(
            (Array.isArray(value) ? value : fallback).filter(
                (id): id is string =>
                    typeof id === 'string' && ids.includes(id),
            ),
        ),
    ];
    const hiddenColumns = list(
        source.hiddenColumns,
        fallback.hiddenColumns,
    ).filter(
        (id) => columns.find((column) => column.id === id)?.hideable !== false,
    );
    // Stored preferences must not bypass the View menu's minimum-one-column rule.
    if (ids.length && hiddenColumns.length === ids.length)
        hiddenColumns.splice(hiddenColumns.indexOf(ids[0]), 1);
    return {
        hiddenColumns: ids.filter((id) => hiddenColumns.includes(id)),
        columnOrder: [
            ...new Set([
                ...list(source.columnOrder, fallback.columnOrder),
                ...ids,
            ]),
        ],
    };
}

function cleanSort(
    value: unknown,
    columns: DataTableColumn[],
): DataTableSort[] {
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.flatMap((item) => {
        if (
            !record(item) ||
            typeof item.id !== 'string' ||
            seen.has(item.id) ||
            !columns.some(
                (column) => column.id === item.id && column.sortable,
            ) ||
            (item.direction !== 'asc' && item.direction !== 'desc')
        )
            return [];
        seen.add(item.id);
        return [{ id: item.id, direction: item.direction } as DataTableSort];
    });
}

/** Attach after configuring columns/defaults/query and before connecting the table or starting its loader. */
export function persistDataTableView(
    table: PkDataTable,
    options: DataTablePersistenceOptions,
): DataTablePersistence {
    bindings.get(table)?.disconnect();
    const storageKey = `pk:data-table:${JSON.stringify([options.version ?? 1, String(options.userId), options.key])}`;
    let storage: DataTablePreferenceStorage | undefined;
    try {
        storage =
            options.storage ?? table.ownerDocument.defaultView?.localStorage;
    } catch {
        /* Storage can be blocked by browser policy. */
    }
    const defaultSort = () => {
        if (table.manualOrder) return [];
        const sort = cleanSort(table.defaultSort, table.columns);
        const first = table.columns.find((column) => column.sortable);
        return sort.length
            ? sort
            : first
              ? [{ id: first.id, direction: 'asc' as const }]
              : [];
    };
    const currentSort = () => {
        if (table.manualOrder) return [];
        const sort = cleanSort(table.query.sort, table.columns);
        return sort.length ? sort : defaultSort();
    };
    try {
        const raw = storage?.getItem(storageKey);
        const saved: unknown = raw ? JSON.parse(raw) : undefined;
        if (record(saved)) {
            table.view = cleanView(saved.view, table.columns, table.view);
            if (options.restoreSort !== false && !table.manualOrder) {
                const sort = cleanSort(saved.sort, table.columns);
                if (sort.length) table.query = { ...table.query, sort };
            }
        }
    } catch {
        /* Invalid or unavailable storage must not prevent the first request. */
    }

    let active = true;
    let pending = false;
    let lastSort = JSON.stringify(currentSort());
    const clear = () => {
        pending = false;
        lastSort = JSON.stringify(currentSort());
        try {
            storage?.removeItem(storageKey);
        } catch {
            /* Persistence is best-effort. */
        }
    };
    const save = () => {
        pending = false;
        if (!active) return;
        const preferences: Preferences = {
            view: cleanView(table.view, table.columns, table.defaultView),
            sort: currentSort(),
        };
        const defaults: Preferences = {
            view: cleanView(
                table.defaultView,
                table.columns,
                table.defaultView,
            ),
            sort: defaultSort(),
        };
        lastSort = JSON.stringify(preferences.sort);
        // Use defaults emits both view and query changes. Save their settled state once.
        if (JSON.stringify(preferences) === JSON.stringify(defaults)) clear();
        else
            try {
                storage?.setItem(storageKey, JSON.stringify(preferences));
            } catch {
                /* Quota or policy failures leave the table usable. */
            }
    };
    const schedule = () => {
        if (pending || !active) return;
        pending = true;
        queueMicrotask(() => {
            if (pending) save();
        });
    };
    const onView = (event: Event) => {
        if (event.target === table) schedule();
    };
    const onQuery = (event: Event) => {
        if (
            event.target === table &&
            JSON.stringify(currentSort()) !== lastSort
        )
            schedule();
    };
    table.addEventListener('pk-view-change', onView);
    table.addEventListener('pk-query-change', onQuery);
    const binding: DataTablePersistence = {
        storageKey,
        clear,
        disconnect() {
            if (pending) save();
            active = false;
            table.removeEventListener('pk-view-change', onView);
            table.removeEventListener('pk-query-change', onQuery);
            if (bindings.get(table) === binding) bindings.delete(table);
        },
    };
    bindings.set(table, binding);
    return binding;
}
