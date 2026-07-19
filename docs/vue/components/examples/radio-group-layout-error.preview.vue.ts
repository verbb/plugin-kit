import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './radio-group-layout-error.example.vue';
import exampleSource from './radio-group-layout-error.example.vue?raw';

export default createVueSfcPreview({
    label: "Layout and Error",
    title: "Radio group layout and error examples",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
