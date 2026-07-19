import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './button-group-other-controls.example.vue';
import exampleSource from './button-group-other-controls.example.vue?raw';

export default createVueSfcPreview({
    label: 'Other Controls',
    title: 'Other controls example',
    example: Example,
    source: exampleSource,
});
