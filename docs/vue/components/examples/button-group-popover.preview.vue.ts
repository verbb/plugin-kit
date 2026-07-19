import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './button-group-popover.example.vue';
import exampleSource from './button-group-popover.example.vue?raw';

export default createVueSfcPreview({
    label: 'Popover',
    title: 'Popover example',
    example: Example,
    source: exampleSource,
});
