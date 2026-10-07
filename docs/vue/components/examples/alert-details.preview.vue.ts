import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-details.example.vue';
import exampleSource from './alert-details.example.vue?raw';

export default createVueSfcPreview({
    label: 'Details and Copying',
    title: 'Copyable alert details',
    example: Example,
    source: exampleSource,
});
