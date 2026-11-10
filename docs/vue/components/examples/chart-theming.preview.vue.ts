import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-theming.example.vue';
import exampleSource from './chart-theming.example.vue?raw';

export default createVueSfcPreview({
    label: 'Theming',
    title: 'Chart tokens set on a wrapper',
    example: Example,
    source: exampleSource,
});
