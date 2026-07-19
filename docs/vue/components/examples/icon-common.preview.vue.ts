import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './icon-common.example.vue';
import exampleSource from './icon-common.example.vue?raw';

export default createVueSfcPreview({
    label: 'Common Icons',
    title: 'Common icons example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
