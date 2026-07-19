import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './popover-with-arrow.example.vue';
import exampleSource from './popover-with-arrow.example.vue?raw';

export default createVueSfcPreview({
    label: 'With Arrow',
    title: 'With arrow example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
