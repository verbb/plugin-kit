import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './color-input-states.example.vue';
import exampleSource from './color-input-states.example.vue?raw';

export default createVueSfcPreview({
    label: "States",
    title: "Color input state examples",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
