import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './date-picker-basic.example.vue';
import exampleSource from './date-picker-basic.example.vue?raw';

export default createVueSfcPreview({
    label: "Basic Usage",
    title: "Basic usage example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
