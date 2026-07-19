import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-allow-create.example.vue';
import exampleSource from './combobox-allow-create.example.vue?raw';

export default createVueSfcPreview({
    label: "Allow Create",
    title: "Allow create example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
