import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './editable-table-cell-validation.example.vue';
import exampleSource from './editable-table-cell-validation.example.vue?raw';

export default createVueSfcPreview({
    label: "Cell Validation",
    title: "Cell validation example",
    example: Example,
    source: exampleSource,
});
