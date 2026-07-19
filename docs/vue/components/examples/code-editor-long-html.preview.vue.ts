import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './code-editor-long-html.example.vue';
import exampleSource from './code-editor-long-html.example.vue?raw';

export default createVueSfcPreview({
    label: "Longer HTML",
    title: "Longer HTML template example",
    example: Example,
    source: exampleSource,
});
