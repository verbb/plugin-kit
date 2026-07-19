import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './checkbox-select-field-layout.example.vue';
import exampleSource from './checkbox-select-field-layout.example.vue?raw';

export default createVueSfcPreview({
    label: "Field Layout",
    title: "Field layout example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
