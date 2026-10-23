import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountExample } from './data-table-links.example';
import source from './data-table-links.example.ts?raw';

export default defineWebPreview({
    label: 'Links, Text and Status',
    title: 'Links, Text and Status',
    layout: 'plain',
    language: 'ts',
    code:
        source +
        '\n// Mount inside <div id="example"><pk-data-table></pk-data-table></div>\nmountExample(document.querySelector<HTMLElement>("#example")!);',
    html: '<pk-data-table></pk-data-table>',
    enhance: mountExample,
});
