import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tooltip-basic.example.vue';
import exampleSource from './tooltip-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    example: Example,
    source: exampleSource,
});
