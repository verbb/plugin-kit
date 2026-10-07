import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-sizes.example.vue';
import exampleSource from './alert-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'Alert sizes',
    example: Example,
    source: exampleSource,
});
