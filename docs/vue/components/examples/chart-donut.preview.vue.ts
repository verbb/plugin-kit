import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-donut.example.vue';
import exampleSource from './chart-donut.example.vue?raw';

export default createVueSfcPreview({
    label: 'Donut',
    title: 'Visitors by country',
    example: Example,
    source: exampleSource,
});
