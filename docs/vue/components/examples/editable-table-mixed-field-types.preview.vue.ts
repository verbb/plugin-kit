import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './editable-table-mixed-field-types.example.vue';
import exampleSource from './editable-table-mixed-field-types.example.vue?raw';

export default createVueSfcPreview({
    label: "Mixed Field Types",
    title: "Mixed field types example",
    example: Example,
    source: exampleSource,
});
