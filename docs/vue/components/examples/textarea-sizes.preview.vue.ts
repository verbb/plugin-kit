import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './textarea-sizes.example.vue';
import exampleSource from './textarea-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: "Sizes",
    title: "Sizes example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
