import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './editable-table-compact-selection.example.vue';
import exampleSource from './editable-table-compact-selection.example.vue?raw';

export default createVueSfcPreview({
    label: "Compact Selection Columns",
    title: "Compact selection columns example",
    example: Example,
    source: exampleSource,
});
