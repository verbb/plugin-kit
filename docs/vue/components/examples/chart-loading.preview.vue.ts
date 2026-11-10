import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-loading.example.vue';
import exampleSource from './chart-loading.example.vue?raw';

export default createVueSfcPreview({
    label: 'Loading',
    title: 'First load and refresh',
    example: Example,
    source: exampleSource,
});
