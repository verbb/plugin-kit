import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line-series.example.vue';
import exampleSource from './chart-line-series.example.vue?raw';

export default createVueSfcPreview({
    label: 'Several Series',
    title: 'Submissions by status',
    example: Example,
    source: exampleSource,
});
