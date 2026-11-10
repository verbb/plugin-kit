import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-funnel.example.vue';
import exampleSource from './chart-funnel.example.vue?raw';

export default createVueSfcPreview({
    label: 'Steps',
    title: 'Cart recovery funnel',
    example: Example,
    source: exampleSource,
});
