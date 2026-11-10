import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line.example.vue';
import exampleSource from './chart-line.example.vue?raw';

export default createVueSfcPreview({
    label: 'Line',
    title: 'Form submissions by day',
    example: Example,
    source: exampleSource,
});
