import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './spinner-basic.example.vue';
import exampleSource from './spinner-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Usage',
    title: 'Basic spinner example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
