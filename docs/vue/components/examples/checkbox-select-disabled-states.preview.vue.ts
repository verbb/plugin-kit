import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './checkbox-select-disabled-states.example.vue';
import exampleSource from './checkbox-select-disabled-states.example.vue?raw';

export default createVueSfcPreview({
    label: "Disabled States",
    title: "Disabled states example",
    example: Example,
    source: exampleSource,
});
