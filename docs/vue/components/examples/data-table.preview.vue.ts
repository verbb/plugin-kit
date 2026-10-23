import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './data-table.example.vue';
import exampleSource from './data-table.example.vue?raw';
export default createVueSfcPreview({
    label: 'Custom Cells',
    title: 'Vue data table',
    example: Example,
    source: exampleSource,
});
