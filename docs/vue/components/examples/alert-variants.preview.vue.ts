import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-variants.example.vue';
import exampleSource from './alert-variants.example.vue?raw';

export default createVueSfcPreview({
    label: 'Variants',
    title: 'Alert variants',
    example: Example,
    source: exampleSource,
});
