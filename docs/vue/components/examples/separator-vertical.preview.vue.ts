import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './separator-vertical.example.vue';
import exampleSource from './separator-vertical.example.vue?raw';

export default createVueSfcPreview({
    label: 'Vertical Separators',
    title: 'Vertical separators example',
    example: Example,
    source: exampleSource,
});
