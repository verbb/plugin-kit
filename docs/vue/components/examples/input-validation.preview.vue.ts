import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './input-validation.example.vue';
import exampleSource from './input-validation.example.vue?raw';

export default createVueSfcPreview({
    label: "Validation",
    title: "Validation example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
