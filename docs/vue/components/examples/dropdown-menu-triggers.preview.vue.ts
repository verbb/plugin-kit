import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './dropdown-menu-triggers.example.vue';
import exampleSource from './dropdown-menu-triggers.example.vue?raw';

export default createVueSfcPreview({
    label: 'Different Triggers',
    title: 'Different triggers example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
