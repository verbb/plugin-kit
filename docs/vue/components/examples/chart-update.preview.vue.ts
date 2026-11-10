import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './chart-update.example.vue';
import exampleSource from './chart-update.example.vue?raw';

export default createVueSfcPreview({
    label: 'Updating Data',
    title: 'Switching sites',
    example: Example,
    source: exampleSource,
});
