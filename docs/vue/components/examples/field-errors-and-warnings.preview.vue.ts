import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './field-errors-and-warnings.example.vue';
import exampleSource from './field-errors-and-warnings.example.vue?raw';

export default createVueSfcPreview({
    label: "Errors and Warnings",
    title: "Errors and warnings example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
