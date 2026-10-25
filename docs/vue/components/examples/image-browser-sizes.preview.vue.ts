import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-sizes.example.vue';
import exampleSource from './image-browser-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'Image browser sizes',
    example: Example,
    source: exampleSource,
});
