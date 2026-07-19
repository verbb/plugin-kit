import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './select-status-input.example.vue';
import exampleSource from './select-status-input.example.vue?raw';

export default createVueSfcPreview({
    label: "Status Input",
    title: "Status input example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
