import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-input-states.example.vue';
import exampleSource from './tiptap-input-states.example.vue?raw';

export default createVueSfcPreview({
    label: "States",
    title: "Tiptap input state examples",
    example: Example,
    source: exampleSource,
});
