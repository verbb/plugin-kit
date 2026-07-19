import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './checkbox-select-selected-values.example.vue';
import exampleSource from './checkbox-select-selected-values.example.vue?raw';

export default createVueSfcPreview({
    label: "Selected Values",
    title: "Selected values example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
