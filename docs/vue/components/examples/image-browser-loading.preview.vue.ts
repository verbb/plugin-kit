import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-loading.example.vue';
import exampleSource from './image-browser-loading.example.vue?raw';

export default createVueSfcPreview({
    label: 'Loading',
    title: 'Loading catalog example',
    example: Example,
    source: exampleSource,
});
