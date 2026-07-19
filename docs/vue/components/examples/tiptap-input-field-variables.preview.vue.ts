import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-input-field-variables.example.vue';
import exampleSource from './tiptap-input-field-variables.example.vue?raw';

export default createVueSfcPreview({
    label: "Field Variables",
    title: "Field variables example",
    example: Example,
    source: exampleSource,
});
