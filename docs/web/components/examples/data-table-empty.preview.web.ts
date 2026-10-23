import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountDataTableExample } from './data-table.fixtures';
import fixtureSource from './data-table.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Empty State',
    title: 'Empty State',
    layout: 'plain',
    language: 'ts',
    code:
        fixtureSource +
        "\n// Mount inside <div id=example><pk-data-table></pk-data-table></div>\nmountDataTableExample(document.querySelector('#example')!, 'empty');",
    html: '<pk-data-table></pk-data-table>',
    enhance: (root) => mountDataTableExample(root, 'empty'),
});
