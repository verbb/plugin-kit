import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tabs-sidebar.example.vue';
import exampleSource from './tabs-sidebar.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sidebar',
    title: 'Sidebar tabs example',
    example: Example,
    source: exampleSource,
});
