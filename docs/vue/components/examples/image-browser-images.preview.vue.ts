import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-images.example.vue';
import exampleSource from './image-browser-images.example.vue?raw';

export default createVueSfcPreview({
    label: 'Image Mode',
    title: 'Image mode example',
    example: Example,
    source: exampleSource,
});
