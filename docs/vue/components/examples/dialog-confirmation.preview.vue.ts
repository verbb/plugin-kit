import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dialog-confirmation.example.vue';
import exampleSource from './dialog-confirmation.example.vue?raw';

export default createVueSfcPreview({
    label: 'Confirmation',
    title: 'Destructive confirmation dialog example',
    example: Example,
    source: exampleSource,
});
