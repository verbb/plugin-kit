import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './checkbox-select-all-selected.example.vue';
import exampleSource from './checkbox-select-all-selected.example.vue?raw';

export default createVueSfcPreview({
    label: "All Selected",
    title: "All selected example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
