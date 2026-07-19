import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './toggle-disabled.example.vue';
import exampleSource from './toggle-disabled.example.vue?raw';

export default createVueSfcPreview({
    label: 'Disabled',
    title: 'Disabled example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
