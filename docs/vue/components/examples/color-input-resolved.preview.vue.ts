import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './color-input-resolved.example.vue';
import exampleSource from './color-input-resolved.example.vue?raw';

export default createVueSfcPreview({
    label: "Resolved Values",
    title: "Resolved values example",
    example: Example,
    source: exampleSource,
});
