import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-editor-expanded-toolbar.example.vue';
import exampleSource from './tiptap-editor-expanded-toolbar.example.vue?raw';

export default createVueSfcPreview({
    label: "Expanded Toolbar",
    title: "Expanded toolbar example",
    example: Example,
    source: exampleSource,
});
