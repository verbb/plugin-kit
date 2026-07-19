import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dialog-scrollable.example.vue';
import exampleSource from './dialog-scrollable.example.vue?raw';

export default createVueSfcPreview({
    label: 'Scrollable Content',
    title: 'Scrollable dialog content example',
    example: Example,
    source: exampleSource,
});
