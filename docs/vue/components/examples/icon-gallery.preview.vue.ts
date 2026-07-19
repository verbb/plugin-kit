import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './icon-gallery.example.vue';
import exampleSource from './icon-gallery.example.vue?raw';

export default createVueSfcPreview({
    label: 'Gallery',
    title: 'Bundled icon gallery',
    example: Example,
    source: exampleSource,
});
