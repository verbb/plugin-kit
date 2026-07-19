import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './popover-basic.example.vue';
import exampleSource from './popover-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    example: Example,
    source: exampleSource,
});
