import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './status-variants.example.vue';
import exampleSource from './status-variants.example.vue?raw';

export default createVueSfcPreview({
    label: 'Variants',
    title: 'Variants example',
    example: Example,
    source: exampleSource,
});
