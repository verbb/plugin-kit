import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tooltip-placement.example.vue';
import exampleSource from './tooltip-placement.example.vue?raw';

export default createVueSfcPreview({
    label: 'Placement',
    title: 'Tooltip placement examples',
    example: Example,
    source: exampleSource,
});
