import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './input-group-button.example.vue';
import exampleSource from './input-group-button.example.vue?raw';

export default createVueSfcPreview({
    label: 'Button Addon',
    title: 'Button addon example',
    example: Example,
    source: exampleSource,
});
