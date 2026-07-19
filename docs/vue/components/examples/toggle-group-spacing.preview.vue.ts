import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './toggle-group-spacing.example.vue';
import exampleSource from './toggle-group-spacing.example.vue?raw';

export default createVueSfcPreview({
    label: 'Spacing',
    title: 'Spacing example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
