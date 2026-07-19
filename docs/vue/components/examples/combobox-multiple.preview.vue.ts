import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-multiple.example.vue';
import exampleSource from './combobox-multiple.example.vue?raw';

export default createVueSfcPreview({
    label: "Multiple Selection",
    title: "Multiple selection example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
