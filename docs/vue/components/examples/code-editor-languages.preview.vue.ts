import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './code-editor-languages.example.vue';
import exampleSource from './code-editor-languages.example.vue?raw';

export default createVueSfcPreview({
    label: "Other Languages",
    title: "JavaScript, CSS, and JSON examples",
    example: Example,
    source: exampleSource,
});
