import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line-axes.example.vue';
import exampleSource from './chart-line-axes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Axis Titles and Range',
    title: 'Completion rate on a fixed 0–100% axis',
    example: Example,
    source: exampleSource,
});
