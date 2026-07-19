import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './spinner-variants.example.vue';
import exampleSource from './spinner-variants.example.vue?raw';

export default createVueSfcPreview({
    label: 'Button Variants',
    title: 'Button variant examples',
    example: Example,
    source: exampleSource,
});
