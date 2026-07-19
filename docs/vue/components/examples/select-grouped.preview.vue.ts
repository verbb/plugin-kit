import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './select-grouped.example.vue';
import exampleSource from './select-grouped.example.vue?raw';

export default createVueSfcPreview({
    label: "Grouped Options",
    title: "Grouped options example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
