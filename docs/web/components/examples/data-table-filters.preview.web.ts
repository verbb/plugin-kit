import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { PkDataTable } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
import {
    filterRows,
    filterColumns,
    filterDefinitions,
} from './data-table-filters.fixtures';
import fixtureSource from './data-table-filters.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Filter Builder',
    title: 'Membership filters',
    layout: 'plain',
    language: 'ts',
    code:
        "import { PkDataTable } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';\n" +
        fixtureSource +
        '\nconst table = document.querySelector<PkDataTable>("pk-data-table")!;\ntable.rows = filterRows;\ntable.columns = filterColumns;\ntable.filters = filterDefinitions;',
    html: '<pk-data-table></pk-data-table>',
    enhance(root) {
        const table = root.querySelector<PkDataTable>('pk-data-table')!;
        table.label = 'Membership filters';
        table.rows = filterRows;
        table.columns = filterColumns;
        table.filters = filterDefinitions;
        table.locale = 'en-AU';
    },
});
