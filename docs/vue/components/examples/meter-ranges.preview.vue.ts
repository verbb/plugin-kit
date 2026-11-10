import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './meter-ranges.example.vue';
import exampleSource from './meter-ranges.example.vue?raw';

export default createVueSfcPreview({
    label: 'Ranges',
    title: 'Completion and spam rates',
    example: Example,
    source: exampleSource,
});
