import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tiptap-input-plain.example.vue';
import exampleSource from './tiptap-input-plain.example.vue?raw';

export default createVueSfcPreview({
    label: "Plain Input",
    title: "Plain input example",
    example: Example,
    source: exampleSource,
});
