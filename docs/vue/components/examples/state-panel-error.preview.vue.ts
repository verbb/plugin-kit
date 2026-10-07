import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './state-panel-error.example.vue';
import exampleSource from './state-panel-error.example.vue?raw';

export default createVueSfcPreview({
    label: 'Error state',
    title: 'Error state with details and an action',
    example: Example,
    source: exampleSource,
});
