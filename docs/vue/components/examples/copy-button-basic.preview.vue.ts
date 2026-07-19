import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './copy-button-basic.example.vue';
import exampleSource from './copy-button-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Usage',
    title: 'Basic usage example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
