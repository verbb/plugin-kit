import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './code-editor-states.example.vue';
import exampleSource from './code-editor-states.example.vue?raw';

export default createVueSfcPreview({
    label: "Validation and Read-only",
    title: "Validation and read-only states",
    example: Example,
    source: exampleSource,
});
