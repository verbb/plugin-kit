import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './field-tip.example.vue';
import exampleSource from './field-tip.example.vue?raw';

export default createVueSfcPreview({
    label: "Tip",
    title: "Tip example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
