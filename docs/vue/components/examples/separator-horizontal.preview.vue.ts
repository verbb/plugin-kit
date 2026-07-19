import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './separator-horizontal.example.vue';
import exampleSource from './separator-horizontal.example.vue?raw';

export default createVueSfcPreview({
    label: 'Horizontal Separators',
    title: 'Horizontal separators example',
    example: Example,
    source: exampleSource,
});
