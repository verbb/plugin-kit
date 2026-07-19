import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-editor-basic.example.vue';
import exampleSource from './tiptap-editor-basic.example.vue?raw';

export default createVueSfcPreview({
    label: "Basic Editor",
    title: "Basic editor example",
    example: Example,
    source: exampleSource,
});
