import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './checkbox-select-all-option.example.vue';
import exampleSource from './checkbox-select-all-option.example.vue?raw';

export default createVueSfcPreview({
    label: "All Option",
    title: "All option example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
