import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-icons.example.vue';
import exampleSource from './image-browser-icons.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icon Mode',
    title: 'Icon mode example',
    example: Example,
    source: exampleSource,
});
