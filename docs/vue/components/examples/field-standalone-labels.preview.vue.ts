import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './field-standalone-labels.example.vue';
import exampleSource from './field-standalone-labels.example.vue?raw';

export default createVueSfcPreview({
    label: "Standalone Labels",
    title: "Standalone labels example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
