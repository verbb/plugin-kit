import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-events.example.vue';
import exampleSource from './chart-events.example.vue?raw';

export default createVueSfcPreview({
    label: 'Events',
    title: 'Chart events',
    example: Example,
    source: exampleSource,
});
