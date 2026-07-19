import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './textarea-validation.example.vue';
import exampleSource from './textarea-validation.example.vue?raw';

export default createVueSfcPreview({
    label: "Validation",
    title: "Validation example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
