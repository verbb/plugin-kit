import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './input-group-icon.example.vue';
import exampleSource from './input-group-icon.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icon Addons',
    title: 'Icon addons example',
    example: Example,
    source: exampleSource,
});
