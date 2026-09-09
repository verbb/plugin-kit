import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-images-none.example.vue';
import exampleSource from './image-browser-images-none.example.vue?raw';

export default createVueSfcPreview({
    label: 'Image No Labels',
    title: 'Image no labels example',
    example: Example,
    source: exampleSource,
});
