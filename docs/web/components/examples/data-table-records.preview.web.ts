import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountDataTableExample } from './data-table.fixtures';
import fixtureSource from './data-table.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Browsing Records',
    title: 'Browsing Records',
    layout: 'plain',
    language: 'ts',
    code:
        fixtureSource +
        "\n// Mount inside <div id=example><pk-data-table></pk-data-table></div>\nmountDataTableExample(document.querySelector('#example')!, 'records');",
    html: '<pk-data-table></pk-data-table><output aria-live="polite" style="display:block;margin-top:12px;font-size:13px"></output>',
    enhance: (root) => mountDataTableExample(root, 'records'),
});
