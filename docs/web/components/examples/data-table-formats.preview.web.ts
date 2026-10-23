import { defineWebPreview } from '../../../.vitepress/theme/components/defineWebPreview';
import { mountExample } from './data-table-formats.example';
import source from './data-table-formats.example.ts?raw';

export default defineWebPreview({
    label: 'Numbers and Dates',
    title: 'Numbers and Dates',
    layout: 'plain',
    language: 'ts',
    code:
        source +
        '\n// Mount inside <div id="example"><pk-data-table></pk-data-table></div>\nmountExample(document.querySelector<HTMLElement>("#example")!);',
    html: '<pk-data-table></pk-data-table>',
    enhance: mountExample,
});
