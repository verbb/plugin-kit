import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-images-inline.example.vue';
import exampleSource from './image-browser-images-inline.example.vue?raw';

export default createVueSfcPreview({
    label: 'Image Inline Labels',
    title: 'Image inline labels example',
    example: Example,
    source: exampleSource,
});
