import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './alert-appearances.example.vue';
import exampleSource from './alert-appearances.example.vue?raw';

export default createVueSfcPreview({
    label: 'Appearances',
    title: 'Alert appearances',
    example: Example,
    source: exampleSource,
});
