import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountOverflowExample } from './data-table-overflow.fixtures';
import fixtureSource from './data-table-overflow.fixtures.ts?raw';

export default defineWebPreview({
    label: 'Overflow',
    title: 'Wrapped text, truncated links and horizontal scrolling',
    layout: 'plain',
    language: 'ts',
    code:
        fixtureSource +
        '\nmountOverflowExample(document.querySelector<HTMLElement>("#overflow-example")!);',
    html: '<div id="overflow-example" style="max-height:420px;overflow:auto;position:relative;padding:2px"><pk-data-table></pk-data-table></div>',
    enhance: mountOverflowExample,
});
