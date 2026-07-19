import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './editable-table-derived-columns.example.vue';
import exampleSource from './editable-table-derived-columns.example.vue?raw';

export default createVueSfcPreview({
    label: "Derived Columns",
    title: "Derived columns example",
    example: Example,
    source: exampleSource,
});
