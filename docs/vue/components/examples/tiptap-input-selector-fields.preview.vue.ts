import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-input-selector-fields.example.vue';
import exampleSource from './tiptap-input-selector-fields.example.vue?raw';

export default createVueSfcPreview({
    label: "Selector Fields",
    title: "Selector fields example",
    example: Example,
    source: exampleSource,
});
