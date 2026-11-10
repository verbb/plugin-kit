import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-bar-grouped.example.vue';
import exampleSource from './chart-bar-grouped.example.vue?raw';

export default createVueSfcPreview({
    label: 'Grouped',
    title: 'Recovered orders by sequence email',
    example: Example,
    source: exampleSource,
});
