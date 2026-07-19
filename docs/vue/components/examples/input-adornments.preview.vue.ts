import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './input-adornments.example.vue';
import exampleSource from './input-adornments.example.vue?raw';

export default createVueSfcPreview({
    label: "Adornments",
    title: "Input adornment examples",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
