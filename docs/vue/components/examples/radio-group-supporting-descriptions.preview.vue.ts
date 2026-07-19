import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './radio-group-supporting-descriptions.example.vue';
import exampleSource from './radio-group-supporting-descriptions.example.vue?raw';

export default createVueSfcPreview({
    label: "Supporting Descriptions",
    title: "Supporting descriptions example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
