import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-legend-none.example.vue';
import exampleSource from './chart-legend-none.example.vue?raw';

export default createVueSfcPreview({
    label: 'No Legend',
    title: 'Chart without a legend',
    example: Example,
    source: exampleSource,
});
