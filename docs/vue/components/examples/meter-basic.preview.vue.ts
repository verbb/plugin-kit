import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './meter-basic.example.vue';
import exampleSource from './meter-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Meter',
    title: 'Meters',
    example: Example,
    source: exampleSource,
});
