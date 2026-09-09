import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-groups.example.vue';
import exampleSource from './image-browser-groups.example.vue?raw';

export default createVueSfcPreview({
    label: 'Grouped Icons',
    title: 'Grouped icons example',
    example: Example,
    source: exampleSource,
});
