import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line-comparison-series.example.vue';
import exampleSource from './chart-line-comparison-series.example.vue?raw';

export default createVueSfcPreview({
    label: 'Several Series',
    title: 'Visitors by device against the previous 14 days',
    example: Example,
    source: exampleSource,
});
