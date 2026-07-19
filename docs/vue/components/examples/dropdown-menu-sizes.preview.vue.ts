import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './dropdown-menu-sizes.example.vue';
import exampleSource from './dropdown-menu-sizes.example.vue?raw';

export default createVueSfcPreview({
    label: 'Sizes',
    title: 'Dropdown sizes example',
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
