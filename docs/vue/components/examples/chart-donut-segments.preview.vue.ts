import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-donut-segments.example.vue';
import exampleSource from './chart-donut-segments.example.vue?raw';

export default createVueSfcPreview({
    label: 'Fewer Segments',
    title: 'Four segments with a custom Other label',
    example: Example,
    source: exampleSource,
});
