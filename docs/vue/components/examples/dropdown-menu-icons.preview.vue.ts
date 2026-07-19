import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dropdown-menu-icons.example.vue';
import exampleSource from './dropdown-menu-icons.example.vue?raw';

export default createVueSfcPreview({
    label: 'Item Icons',
    title: 'Items with icons example',
    example: Example,
    source: exampleSource,
});
