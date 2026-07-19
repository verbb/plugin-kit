import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tabs-pane.example.vue';
import exampleSource from './tabs-pane.example.vue?raw';

export default createVueSfcPreview({
    label: 'Pane Tabs',
    title: 'Pane tabs example',
    example: Example,
    source: exampleSource,
});
