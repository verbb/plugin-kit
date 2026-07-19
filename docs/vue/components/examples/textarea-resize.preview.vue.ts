import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './textarea-resize.example.vue';
import exampleSource from './textarea-resize.example.vue?raw';

export default createVueSfcPreview({
    label: "Resize",
    title: "Resize example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
