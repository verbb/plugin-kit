import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './button-group-basic.example.vue';
import exampleSource from './button-group-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Example',
    title: 'Basic example',
    example: Example,
    source: exampleSource,
});
