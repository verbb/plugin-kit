import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './code-editor-layout.example.vue';
import exampleSource from './code-editor-layout.example.vue?raw';

export default createVueSfcPreview({
    label: "Layout Options",
    title: "Rows, tab size, and line numbers",
    example: Example,
    source: exampleSource,
});
