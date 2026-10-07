import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-icons.example.vue';
import exampleSource from './alert-icons.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icons',
    title: 'Alert icon options',
    example: Example,
    source: exampleSource,
});
