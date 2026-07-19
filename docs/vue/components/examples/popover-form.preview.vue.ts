import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './popover-form.example.vue';
import exampleSource from './popover-form.example.vue?raw';

export default createVueSfcPreview({
    label: 'Form Content',
    title: 'Popover form content example',
    example: Example,
    source: exampleSource,
});
