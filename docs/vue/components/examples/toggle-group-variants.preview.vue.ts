import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './toggle-group-variants.example.vue';
import exampleSource from './toggle-group-variants.example.vue?raw';

const previewStackStyle = Object.assign({}, stackStyle, {
    maxWidth: 'none',
    gap: '16px',
});

export default createVueSfcPreview({
    label: 'Variants',
    title: 'Variants example',
    example: Example,
    source: exampleSource,
    wrapStyle: previewStackStyle,
});
