import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './toggle-variants.example.vue';
import exampleSource from './toggle-variants.example.vue?raw';

export default createVueSfcPreview({
    label: 'Variants',
    title: 'Variants example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
