import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './state-panel-scrolling-details.example.vue';
import exampleSource from './state-panel-scrolling-details.example.vue?raw';

export default createVueSfcPreview({
    label: 'Scrolling Details',
    title: 'State Panel with scrolling diagnostic details',
    example: Example,
    source: exampleSource,
});
