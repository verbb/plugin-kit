import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-bar-percent.example.vue';
import exampleSource from './chart-bar-percent.example.vue?raw';

export default createVueSfcPreview({
    label: '100% Stacked',
    title: 'Device share by traffic source',
    example: Example,
    source: exampleSource,
});
