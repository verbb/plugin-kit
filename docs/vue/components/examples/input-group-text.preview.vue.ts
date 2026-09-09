import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './input-group-text.example.vue';
import exampleSource from './input-group-text.example.vue?raw';

export default createVueSfcPreview({
    label: 'Text Addons',
    title: 'Text addons example',
    example: Example,
    source: exampleSource,
});
