import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tabs-modal.example.vue';
import exampleSource from './tabs-modal.example.vue?raw';

export default createVueSfcPreview({
    label: 'Modal Tabs',
    title: 'Modal tabs example',
    example: Example,
    source: exampleSource,
});
