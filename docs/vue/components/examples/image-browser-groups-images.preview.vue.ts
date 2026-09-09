import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './image-browser-groups-images.example.vue';
import exampleSource from './image-browser-groups-images.example.vue?raw';

export default createVueSfcPreview({
    label: 'Grouped Images',
    title: 'Grouped images example',
    example: Example,
    source: exampleSource,
});
