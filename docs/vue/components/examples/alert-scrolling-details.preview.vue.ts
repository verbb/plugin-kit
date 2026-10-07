import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-scrolling-details.example.vue';
import exampleSource from './alert-scrolling-details.example.vue?raw';

export default createVueSfcPreview({
    label: 'Scrolling Details',
    title: 'Alert with scrolling diagnostic details',
    example: Example,
    source: exampleSource,
});
