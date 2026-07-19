import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './popover-placement.example.vue';
import exampleSource from './popover-placement.example.vue?raw';

export default createVueSfcPreview({
    label: 'Placement',
    title: 'Popover placement examples',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
