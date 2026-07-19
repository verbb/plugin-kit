import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './icon-accessibility.example.vue';
import exampleSource from './icon-accessibility.example.vue?raw';

export default createVueSfcPreview({
    label: 'Accessibility',
    title: 'Accessibility example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
