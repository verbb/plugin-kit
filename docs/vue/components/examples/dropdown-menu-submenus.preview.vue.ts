import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dropdown-menu-submenus.example.vue';
import exampleSource from './dropdown-menu-submenus.example.vue?raw';

export default createVueSfcPreview({
    label: 'Submenus',
    title: 'Submenus example',
    example: Example,
    source: exampleSource,
});
