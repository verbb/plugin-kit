import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-grouped.example.vue';
import exampleSource from './combobox-grouped.example.vue?raw';

export default createVueSfcPreview({
    label: "Grouped Options",
    title: "Grouped options example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
