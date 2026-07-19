import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './toggle-group-sizes.example.vue';
import exampleSource from './toggle-group-sizes.example.vue?raw';

const previewStackStyle = Object.assign({}, stackStyle, {
    maxWidth: 'none',
    gap: '16px',
});

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'Sizes example',
    example: Example,
    source: exampleSource,
    wrapStyle: previewStackStyle,
});
