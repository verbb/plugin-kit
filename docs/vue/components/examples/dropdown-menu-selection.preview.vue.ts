import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dropdown-menu-selection.example.vue';
import exampleSource from './dropdown-menu-selection.example.vue?raw';

export default createVueSfcPreview({
    label: 'Selection Items',
    title: 'Dropdown menu selection item example',
    example: Example,
    source: exampleSource,
});
