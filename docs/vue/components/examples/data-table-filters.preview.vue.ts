import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './data-table-filters.example.vue';
import exampleSource from './data-table-filters.example.vue?raw';
export default createVueSfcPreview({
    label: 'Filter Builder',
    title: 'Membership filters',
    example: Example,
    source: exampleSource,
});
