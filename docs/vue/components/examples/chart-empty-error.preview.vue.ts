import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-empty-error.example.vue';
import exampleSource from './chart-empty-error.example.vue?raw';

export default createVueSfcPreview({
    label: 'Empty and Error',
    title: 'Empty and error states',
    example: Example,
    source: exampleSource,
});
