import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-locale.example.vue';
import exampleSource from './chart-locale.example.vue?raw';

export default createVueSfcPreview({
    label: 'Locale and RTL',
    title: 'German and Arabic charts',
    example: Example,
    source: exampleSource,
});
