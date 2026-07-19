import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './icon-sizing.example.vue';
import exampleSource from './icon-sizing.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizing',
    title: 'Sizing example',
    example: Example,
    source: exampleSource,
});
