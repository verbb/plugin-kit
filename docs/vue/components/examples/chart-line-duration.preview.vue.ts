import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line-duration.example.vue';
import exampleSource from './chart-line-duration.example.vue?raw';

export default createVueSfcPreview({
    label: 'Durations',
    title: 'Average time to complete by week',
    example: Example,
    source: exampleSource,
});
