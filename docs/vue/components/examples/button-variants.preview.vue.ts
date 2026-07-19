import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './button-variants.example.vue';
import exampleSource from './button-variants.example.vue?raw';

export default createVueSfcPreview({
    label: 'Variants',
    title: 'Variants example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
