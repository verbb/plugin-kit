import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountDataTableExample } from './data-table.fixtures';
import fixtureSource from './data-table.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Compact Table',
    title: 'A compact record table without row selection.',
    layout: 'plain',
    language: 'ts',
    code: fixtureSource + '\nmountDataTableExample(root, "compact");',
    html: '<div style="max-height:420px;overflow:auto;position:relative;padding:2px"><pk-data-table></pk-data-table></div><output aria-live="polite" style="display:block;margin-top:12px"></output>',
    enhance: (root) => mountDataTableExample(root, 'compact'),
});
