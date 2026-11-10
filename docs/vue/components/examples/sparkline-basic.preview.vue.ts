import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './sparkline-basic.example.vue';
import exampleSource from './sparkline-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sparkline',
    title: 'Sparklines',
    example: Example,
    source: exampleSource,
});
