import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './data-table-order.example.vue';
import exampleSource from './data-table-order.example.vue?raw';
export default createVueSfcPreview({
    label: 'Manual Order', title: 'Filesystem order',
    example: Example, source: exampleSource,
});
