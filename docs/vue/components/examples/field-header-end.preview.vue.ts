import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './field-header-end.example.vue';
import exampleSource from './field-header-end.example.vue?raw';

export default createVueSfcPreview({
    label: "Header End",
    title: "Header end example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
