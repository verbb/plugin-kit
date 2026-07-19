import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dropdown-menu-basic.example.vue';
import exampleSource from './dropdown-menu-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Menu',
    title: 'Basic menu example',
    example: Example,
    source: exampleSource,
});
