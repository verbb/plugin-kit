import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './lightswitch-labels.example.vue';
import exampleSource from './lightswitch-labels.example.vue?raw';

export default createVueSfcPreview({
    label: "Labels",
    title: "Lightswitch label examples",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
