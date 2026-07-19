import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-input-mode.example.vue';
import exampleSource from './combobox-input-mode.example.vue?raw';

export default createVueSfcPreview({
    label: "Input Mode",
    title: "Input mode example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
