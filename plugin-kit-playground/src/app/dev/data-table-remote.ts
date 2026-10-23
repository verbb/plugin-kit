import {
    PkDataTable,
    defaultDataTableQuery,
    queryDataTable,
    type DataTableColumn,
    type DataTableFilter,
    type DataTableQuery,
    type DataTableRow,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
import './data-table-remote.css';

const rows: DataTableRow[] = Array.from({ length: 120 }, (_, index) => ({
    id: index + 1,
    name: `${['Alex Morgan', 'Jamie Ellis', 'Taylor Chen', 'Sam Rivera', 'Casey Wright', 'Jordan Lee'][index % 6]} ${index + 1}`,
    status: ['active', 'pending', 'inactive'][index % 3],
    requests: index * 3 + 1,
    created: new Date(Date.UTC(2026, 9, 23 - index % 20)).toISOString(),
}));
const columns: DataTableColumn[] = [
    { id: 'name', label: 'Participant', sortable: true, hideable: false },
    { id: 'status', label: 'Status', type: 'status', sortable: true },
    { id: 'created', label: 'Created', type: 'date', sortable: true },
    { id: 'requests', label: 'Requests', type: 'number', sortable: true },
];
const filters: DataTableFilter[] = [
    { id: 'status', label: 'Status', type: 'select', options: [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'inactive', label: 'Inactive' },
    ] },
    { id: 'requests', label: 'Requests', type: 'number-range' },
    { id: 'created', label: 'Created', type: 'date-range' },
];

/** In-memory endpoint simulation. It uses the real remote loader and cancellation contract. */
export function mountRemoteDataTableLab(outlet: HTMLElement): () => void {
    const lifetime = new AbortController();
    const page = document.createElement('div');
    page.className = 'pg-page pg-remote-table';
    page.innerHTML = `<div class="pg-page__hero">
        <div class="pg-page__eyebrow">Dev tools</div>
        <h1 class="pg-page__title">Remote data table</h1>
        <p class="pg-page__lead">Test the real remote-loading UI against a delayed in-memory endpoint. Search, filter, sort and page through 120 records; no server or account is needed.</p>
    </div>`;
    const content = document.createElement('div');
    content.innerHTML = `
        <section class="remote-controls" aria-label="Endpoint simulation">
            <label>Response delay <select data-delay aria-label="Response delay">
                <option value="0">No delay</option><option value="500">0.5 seconds</option>
                <option value="1500" selected>1.5 seconds</option><option value="4000">4 seconds</option>
            </select></label>
            <label>Next response <select data-outcome aria-label="Next response">
                <option value="success">Success</option><option value="error">Error, then recover</option>
                <option value="empty">Empty, then recover</option>
            </select></label>
            <label class="remote-race"><input type="checkbox" data-race> Finish older requests late</label>
            <pk-button data-reload>Reload current query</pk-button>
            <pk-button data-restart>Restart initial load</pk-button>
        </section>
        <p class="remote-hint">Changes apply to the next request. Late-response mode alternates 4-second and 0.5-second responses and deliberately ignores cancellation. Type “Alex”, then “Jamie” before Alex finishes: only Jamie should appear.</p>
        <div class="remote-table-host"></div>
        <p class="remote-result" role="status" aria-live="polite">Waiting for the first response…</p>
        <details class="remote-log" open><summary>Request log</summary>
            <p>Filters are applied before pagination. Cancelled or stale responses must never replace the current rows. Export simulates work without downloading a file.</p>
            <ol aria-label="Request log"></ol>
        </details>
    `;
    page.append(content);
    outlet.replaceChildren(page);
    const delay = page.querySelector<HTMLSelectElement>('[data-delay]')!;
    const outcome = page.querySelector<HTMLSelectElement>('[data-outcome]')!;
    const race = page.querySelector<HTMLInputElement>('[data-race]')!;
    const host = page.querySelector<HTMLElement>('.remote-table-host')!;
    const log = page.querySelector<HTMLOListElement>('.remote-log ol')!;
    const result = page.querySelector<HTMLElement>('.remote-result')!;
    let sequence = 0;
    let raceSequence = 0;
    let currentTable: PkDataTable;
    let tableLifetime: AbortController | undefined;

    const note = (message: string): HTMLLIElement => {
        const entry = document.createElement('li');
        entry.textContent = message;
        log.prepend(entry);
        while (log.children.length > 20) log.lastElementChild?.remove();
        return entry;
    };
    const wait = (ms: number, signals: AbortSignal[]): Promise<void> => new Promise((resolve, reject) => {
        const cleanup = () => signals.forEach(signal => signal.removeEventListener('abort', abort));
        const timer = window.setTimeout(() => { cleanup(); resolve(); }, ms);
        const abort = () => {
            clearTimeout(timer);
            cleanup();
            reject(new DOMException('Request cancelled', 'AbortError'));
        };
        if (signals.some(signal => signal.aborted)) abort();
        else signals.forEach(signal => signal.addEventListener('abort', abort, { once: true }));
    });
    const describe = (query: DataTableQuery) => JSON.stringify({
        search: query.search, filters: query.filters, operators: query.filterOperators,
        sort: query.sort, page: query.pageIndex + 1, pageSize: query.pageSize,
    });
    const mountTable = () => {
        tableLifetime?.abort();
        tableLifetime = new AbortController();
        const instanceSignal = tableLifetime.signal;
        host.replaceChildren();
        raceSequence = 0;
        const table = new PkDataTable();
        currentTable = table;
        table.label = 'Remote membership requests';
        table.mode = 'remote';
        table.columns = columns;
        table.filters = filters;
        table.selectable = true;
        table.rowLabel = 'name';
        table.query = { ...defaultDataTableQuery(), pageSize: 8 };
        table.exportFormats = [{ value: 'csv', label: 'CSV' }, { value: 'json', label: 'JSON' }];
        table.dataSource = async (query, { signal }) => {
            const id = ++sequence;
            const slowOlderRequests = race.checked;
            const duration = slowOlderRequests ? (++raceSequence % 2 ? 4000 : 500) : Number(delay.value);
            const response = outcome.value;
            outcome.value = 'success';
            const started = performance.now();
            const description = `#${id} · ${duration}ms · ${describe(query)}`;
            const entry = note(`Pending ${description}`);
            const signals = [lifetime.signal, instanceSignal, ...(slowOlderRequests ? [] : [signal])];
            try {
                await wait(duration, signals);
                if (response === 'error') throw new Error('Simulated endpoint failure');
                const data = response === 'empty' ? { rows: [], total: 0 } : queryDataTable(rows, columns, filters, query);
                entry.textContent = `${signal.aborted ? 'Stale response (ignored)' : 'Completed'} ${description} · ${Math.round(performance.now() - started)}ms · ${data.rows.length} rows / ${data.total} total`;
                return data;
            } catch (error) {
                entry.textContent = `${signals.some(item => item.aborted) ? 'Cancelled' : 'Failed'} ${description}`;
                throw error;
            }
        };
        table.addEventListener('pk-load', () => {
            result.textContent = `Showing the accepted response for ${describe(table.query)}`;
        }, { signal: instanceSignal });
        table.addEventListener('pk-load-error', () => {
            result.textContent = 'The simulated request failed. Use Retry in the table to recover.';
        }, { signal: instanceSignal });
        table.addEventListener('pk-export', async () => {
            table.exporting = true;
            const entry = note('Export pending…');
            try {
                await wait(Number(delay.value), [lifetime.signal, instanceSignal]);
                entry.textContent = 'Export completed (simulation only; no file downloaded).';
            } catch {
                entry.textContent = 'Export cancelled.';
            } finally {
                table.exporting = false;
            }
        }, { signal: instanceSignal });
        host.append(table);
    };
    page.querySelector('[data-reload]')!.addEventListener('click', () => void currentTable.refresh(), { signal: lifetime.signal });
    page.querySelector('[data-restart]')!.addEventListener('click', () => {
        result.textContent = 'Waiting for the first response…';
        mountTable();
    }, { signal: lifetime.signal });
    race.addEventListener('change', () => { raceSequence = 0; }, { signal: lifetime.signal });
    mountTable();
    return () => {
        lifetime.abort();
        tableLifetime?.abort();
        page.remove();
    };
}
