import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line-comparison.example.vue';
import exampleSource from './chart-line-comparison.example.vue?raw';

export default createVueSfcPreview({
    label: 'Previous Period',
    title: 'Recovered revenue against the previous 14 days',
    example: Example,
    source: exampleSource,
});
