import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-input-email-variables.example.vue';
import exampleSource from './tiptap-input-email-variables.example.vue?raw';

export default createVueSfcPreview({
    label: "Email Variables",
    title: "Email variables example",
    example: Example,
    source: exampleSource,
});
