import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './button-loading.example.vue';
import exampleSource from './button-loading.example.vue?raw';

export default createVueSfcPreview({
    label: 'Loading',
    title: 'Loading example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
