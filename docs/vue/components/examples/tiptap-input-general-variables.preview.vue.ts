import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-input-general-variables.example.vue';
import exampleSource from './tiptap-input-general-variables.example.vue?raw';

export default createVueSfcPreview({
    label: "General Variables",
    title: "General variables example",
    example: Example,
    source: exampleSource,
});
