import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './button-disabled-link.example.vue';
import exampleSource from './button-disabled-link.example.vue?raw';

export default createVueSfcPreview({
    label: 'Disabled and Links',
    title: 'Disabled and link button examples',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
