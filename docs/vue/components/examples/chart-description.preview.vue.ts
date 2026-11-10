import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-description.example.vue';
import exampleSource from './chart-description.example.vue?raw';

export default createVueSfcPreview({
    label: 'Description',
    title: 'Chart with a screen-reader description',
    example: Example,
    source: exampleSource,
});
