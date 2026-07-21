import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './date-picker-multiple.example.vue';
import exampleSource from './date-picker-multiple.example.vue?raw';

export default createVueSfcPreview({
    label: "Multiple",
    title: "Multiple example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
