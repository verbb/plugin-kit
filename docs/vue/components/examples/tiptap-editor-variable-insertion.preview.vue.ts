import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-editor-variable-insertion.example.vue';
import exampleSource from './tiptap-editor-variable-insertion.example.vue?raw';

export default createVueSfcPreview({
    label: "Variable Insertion",
    title: "Variable insertion example",
    example: Example,
    source: exampleSource,
});
