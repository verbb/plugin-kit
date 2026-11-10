import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-bar.example.vue';
import exampleSource from './chart-bar.example.vue?raw';

export default createVueSfcPreview({
    label: 'Bar',
    title: 'Recovered revenue by month',
    example: Example,
    source: exampleSource,
});
