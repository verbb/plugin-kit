import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './copy-button-variants.example.vue';
import exampleSource from './copy-button-variants.example.vue?raw';

export default createVueSfcPreview({
    label: 'Variants',
    title: 'Copy button variant examples',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
