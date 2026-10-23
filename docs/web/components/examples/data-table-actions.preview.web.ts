import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountDataTableExample } from './data-table.fixtures';
import fixtureSource from './data-table.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Selection and Actions',
    title: 'Selection and Actions',
    layout: 'plain',
    language: 'ts',
    code:
        fixtureSource +
        "\n// Mount inside <div id=example><pk-data-table></pk-data-table></div>\nmountDataTableExample(document.querySelector('#example')!, 'actions');",
    html: '<pk-data-table></pk-data-table><output aria-live="polite"></output>',
    enhance: (root) => mountDataTableExample(root, 'actions'),
});
