import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountExample } from './data-table-statuses.example';
import source from './data-table-statuses.example.ts?raw';
export default defineWebPreview({
    label: 'Status Labels',
    title: 'Status Labels',
    layout: 'plain',
    language: 'ts',
    code:
        source +
        '\n// Mount inside <div id="example"><pk-data-table></pk-data-table></div>\nmountExample(document.querySelector<HTMLElement>("#example")!);',
    html: '<pk-data-table></pk-data-table>',
    enhance: mountExample,
});
