import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-bar-horizontal.example.vue';
import exampleSource from './chart-bar-horizontal.example.vue?raw';

export default createVueSfcPreview({
    label: 'Horizontal',
    title: 'Top forms by submissions',
    example: Example,
    source: exampleSource,
});
