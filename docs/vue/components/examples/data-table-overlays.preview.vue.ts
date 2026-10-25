import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './data-table-overlays.example.vue';
import exampleSource from './data-table-overlays.example.vue?raw';

export default createVueSfcPreview({
    label: 'Dialogs and Popovers',
    title: 'Consumer-owned email preview and delivery summary',
    example: Example,
    source: exampleSource,
});
