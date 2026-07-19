import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './time-picker-empty.example.vue';
import exampleSource from './time-picker-empty.example.vue?raw';

export default createVueSfcPreview({
    label: "Empty State",
    title: "Empty state example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
