import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './button-group-sizes.example.vue';
import exampleSource from './button-group-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'Sizes example',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
