import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './textarea-widths.example.vue';
import exampleSource from './textarea-widths.example.vue?raw';

export default createVueSfcPreview({
    label: "Widths",
    title: "Widths example",
    example: Example,
    source: exampleSource,
});
