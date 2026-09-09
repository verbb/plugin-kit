import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-icons-inline.example.vue';
import exampleSource from './image-browser-icons-inline.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icon Inline Labels',
    title: 'Icon inline labels example',
    example: Example,
    source: exampleSource,
});
