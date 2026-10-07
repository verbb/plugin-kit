import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-dismissible.example.vue';
import exampleSource from './alert-dismissible.example.vue?raw';

export default createVueSfcPreview({
    label: 'Dismissible',
    title: 'Dismissible alert',
    example: Example,
    source: exampleSource,
});
