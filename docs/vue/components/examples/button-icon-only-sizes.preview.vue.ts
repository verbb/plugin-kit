import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './button-icon-only-sizes.example.vue';
import exampleSource from './button-icon-only-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icon-Only Sizes',
    title: 'Icon-only button size examples',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
