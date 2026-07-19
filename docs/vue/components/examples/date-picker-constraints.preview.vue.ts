import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './date-picker-constraints.example.vue';
import exampleSource from './date-picker-constraints.example.vue?raw';

export default createVueSfcPreview({
    label: "Constraints",
    title: "Constraints example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
