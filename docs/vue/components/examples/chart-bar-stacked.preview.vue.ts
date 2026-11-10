import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-bar-stacked.example.vue';
import exampleSource from './chart-bar-stacked.example.vue?raw';

export default createVueSfcPreview({
    label: 'Stacked',
    title: 'Carts not emailed, by reason',
    example: Example,
    source: exampleSource,
});
