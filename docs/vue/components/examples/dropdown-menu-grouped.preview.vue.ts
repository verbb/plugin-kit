import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dropdown-menu-grouped.example.vue';
import exampleSource from './dropdown-menu-grouped.example.vue?raw';

export default createVueSfcPreview({
    label: 'Grouped Options',
    title: 'Grouped options example',
    example: Example,
    source: exampleSource,
});
