import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './scroll-area-vertical.example.vue';
import exampleSource from './scroll-area-vertical.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Vertical Scrolling',
    title: 'Basic vertical scrolling example',
    example: Example,
    source: exampleSource,
});
