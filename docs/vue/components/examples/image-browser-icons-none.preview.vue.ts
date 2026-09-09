import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-icons-none.example.vue';
import exampleSource from './image-browser-icons-none.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icon No Labels',
    title: 'Icon no labels example',
    example: Example,
    source: exampleSource,
});
