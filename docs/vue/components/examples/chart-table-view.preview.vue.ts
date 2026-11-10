import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-table-view.example.vue';
import exampleSource from './chart-table-view.example.vue?raw';

export default createVueSfcPreview({
    label: 'Table View',
    title: 'Submissions by status as a table',
    example: Example,
    source: exampleSource,
});
