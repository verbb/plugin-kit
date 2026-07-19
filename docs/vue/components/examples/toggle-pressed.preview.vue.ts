import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './toggle-pressed.example.vue';
import exampleSource from './toggle-pressed.example.vue?raw';

export default createVueSfcPreview({
    label: 'Pressed',
    title: 'Pressed example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
