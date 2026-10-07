import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './state-panel-empty.example.vue';
import exampleSource from './state-panel-empty.example.vue?raw';

export default createVueSfcPreview({
    label: 'Empty state',
    title: 'Empty state panel',
    example: Example,
    source: exampleSource,
});
