import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './scroll-area-horizontal.example.vue';
import exampleSource from './scroll-area-horizontal.example.vue?raw';

export default createVueSfcPreview({
    label: 'Horizontal Scrolling',
    title: 'Horizontal scrolling example',
    example: Example,
    source: exampleSource,
});
