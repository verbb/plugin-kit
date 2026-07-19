import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './select-widths.example.vue';
import exampleSource from './select-widths.example.vue?raw';

export default createVueSfcPreview({
    label: "Widths",
    title: "Widths example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
