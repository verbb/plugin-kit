import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './field-translatable.example.vue';
import exampleSource from './field-translatable.example.vue?raw';

export default createVueSfcPreview({
    label: "Translatable",
    title: "Translatable example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
