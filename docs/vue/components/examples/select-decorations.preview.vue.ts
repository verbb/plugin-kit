import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './select-decorations.example.vue';
import exampleSource from './select-decorations.example.vue?raw';

export default createVueSfcPreview({
    label: "Decorations",
    title: "Decorations example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
