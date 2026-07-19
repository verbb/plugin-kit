import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './dialog-basic.example.vue';
import exampleSource from './dialog-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Dialog',
    title: 'Basic dialog example',
    example: Example,
    source: exampleSource,
});
