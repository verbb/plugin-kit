import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './combobox-sizes.example.vue';
import exampleSource from './combobox-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: "Sizes",
    title: "Sizes example",
    example: Example,
    source: exampleSource,
});
