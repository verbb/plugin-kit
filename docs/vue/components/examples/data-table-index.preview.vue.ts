import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './data-table-index.example.vue';
import exampleSource from './data-table-index.example.vue?raw';
export default createVueSfcPreview({
    label: 'Index Layout',
    title: 'Selectable member directory',
    example: Example,
    source: exampleSource,
});
