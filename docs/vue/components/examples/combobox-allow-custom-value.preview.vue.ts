import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-allow-custom-value.example.vue';
import exampleSource from './combobox-allow-custom-value.example.vue?raw';

export default createVueSfcPreview({
    label: "Custom Values",
    title: "Allow custom value example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
