import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './button-icons.example.vue';
import exampleSource from './button-icons.example.vue?raw';

export default createVueSfcPreview({
    label: 'Icons',
    title: 'Icons example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
