import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-height.example.vue';
import exampleSource from './chart-height.example.vue?raw';

export default createVueSfcPreview({
    label: 'Height',
    title: 'A taller drawing area',
    example: Example,
    source: exampleSource,
});
