import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import {
    PkDataTable,
    queryDataTable,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
import {
    filterRows,
    filterColumns,
    filterDefinitions,
} from './data-table-filters.fixtures';
import fixtureSource from './data-table-filters.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Remote Filters',
    title: 'Apply filters to a remote query',
    layout: 'plain',
    language: 'ts',
    code:
        "import { PkDataTable } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';\n" +
        fixtureSource +
        '\nconst table = document.querySelector<PkDataTable>("pk-data-table")!;\ntable.columns = filterColumns;\ntable.filters = filterDefinitions;\n// A production loader sends query.filters and query.filterOperators to its endpoint.\ntable.mode = "remote";\ntable.dataSource = async (query, { signal }) => {\n    const response = await fetch("/api/members/search", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(query), signal});\n    if (!response.ok) throw new Error("Unable to load members");\n    return response.json();\n};',
    html: '<pk-data-table></pk-data-table><output aria-live="polite" style="display:block;margin-top:12px;white-space:pre-wrap;font-size:12px"></output>',
    enhance(root) {
        const table = root.querySelector<PkDataTable>('pk-data-table')!;
        table.label = 'Remote membership filters';
        table.columns = filterColumns;
        table.filters = filterDefinitions;
        table.mode = 'remote';
        let requests = 0;
        table.dataSource = async (query, { signal }) => {
            const output = root.querySelector('output')!;
            output.textContent = `Request ${++requests}: ${JSON.stringify({ filters: query.filters, filterOperators: query.filterOperators ?? {} })}`;
            await new Promise<void>((resolve, reject) => {
                const abort = () => {
                    clearTimeout(timer);
                    reject(new DOMException('Aborted', 'AbortError'));
                };
                const timer = setTimeout(() => {
                    signal.removeEventListener('abort', abort);
                    resolve();
                }, 400);
                signal.addEventListener('abort', abort, { once: true });
            });
            return queryDataTable(
                filterRows,
                filterColumns,
                filterDefinitions,
                query,
            );
        };
    },
});
