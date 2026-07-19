import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './icon-color.example.vue';
import exampleSource from './icon-color.example.vue?raw';

export default createVueSfcPreview({
    label: 'Color',
    title: 'Color example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
