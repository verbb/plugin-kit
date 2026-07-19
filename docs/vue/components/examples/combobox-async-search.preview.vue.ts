import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-async-search.example.vue';
import exampleSource from './combobox-async-search.example.vue?raw';

export default createVueSfcPreview({
    label: 'Async Search',
    title: 'Async search example',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
