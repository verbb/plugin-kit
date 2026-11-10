import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-line-curve.example.vue';
import exampleSource from './chart-line-curve.example.vue?raw';

export default createVueSfcPreview({
    label: 'Area and Curve',
    title: 'Smooth and linear areas',
    example: Example,
    source: exampleSource,
});
