import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './button-group-split-actions.example.vue';
import exampleSource from './button-group-split-actions.example.vue?raw';

export default createVueSfcPreview({
    label: 'Split Actions',
    title: 'Split actions example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
