import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './button-group-dropdown.example.vue';
import exampleSource from './button-group-dropdown.example.vue?raw';

export default createVueSfcPreview({
    label: 'Dropdown',
    title: 'Dropdown example',
    example: Example,
    source: exampleSource,
});
