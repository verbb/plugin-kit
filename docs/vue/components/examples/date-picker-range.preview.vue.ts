import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './date-picker-range.example.vue';
import exampleSource from './date-picker-range.example.vue?raw';

export default createVueSfcPreview({
    label: "Range",
    title: "Range example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
