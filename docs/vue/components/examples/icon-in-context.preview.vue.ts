import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './icon-in-context.example.vue';
import exampleSource from './icon-in-context.example.vue?raw';

export default createVueSfcPreview({
    label: 'In Context',
    title: 'In context example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
