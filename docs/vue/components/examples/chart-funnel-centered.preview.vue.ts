import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-funnel-centered.example.vue';
import exampleSource from './chart-funnel-centered.example.vue?raw';

export default createVueSfcPreview({
    label: 'Centred',
    title: 'Job Application completion by page',
    example: Example,
    source: exampleSource,
});
