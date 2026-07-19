import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tooltip-action-hints.example.vue';
import exampleSource from './tooltip-action-hints.example.vue?raw';

export default createVueSfcPreview({
    label: 'Action Hints',
    title: 'Action hints example',
    example: Example,
    source: exampleSource,
});
