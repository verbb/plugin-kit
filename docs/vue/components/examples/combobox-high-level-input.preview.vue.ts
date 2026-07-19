import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-high-level-input.example.vue';
import exampleSource from './combobox-high-level-input.example.vue?raw';

export default createVueSfcPreview({
    label: 'Higher-Level Input API',
    title: 'Higher-level input API example',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
