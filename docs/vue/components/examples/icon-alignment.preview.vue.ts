import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './icon-alignment.example.vue';
import exampleSource from './icon-alignment.example.vue?raw';

export default createVueSfcPreview({
    label: 'Alignment',
    title: 'Alignment example',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
