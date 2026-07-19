import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './button-sizes.example.vue';
import exampleSource from './button-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'Sizes example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
