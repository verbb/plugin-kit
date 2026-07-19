import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './spinner-colors.example.vue';
import exampleSource from './spinner-colors.example.vue?raw';

export default createVueSfcPreview({
    label: 'Colors',
    title: 'Spinner color examples',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
