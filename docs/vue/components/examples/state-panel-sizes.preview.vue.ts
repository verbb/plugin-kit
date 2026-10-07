import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './state-panel-sizes.example.vue';
import exampleSource from './state-panel-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'State panel sizes',
    example: Example,
    source: exampleSource,
});
