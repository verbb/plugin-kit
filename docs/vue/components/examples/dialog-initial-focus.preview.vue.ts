import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dialog-initial-focus.example.vue';
import exampleSource from './dialog-initial-focus.example.vue?raw';

export default createVueSfcPreview({
    label: 'Initial Focus',
    title: 'Initial focus example',
    example: Example,
    source: exampleSource,
});
