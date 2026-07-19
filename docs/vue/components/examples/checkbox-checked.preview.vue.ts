import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './checkbox-checked.example.vue';
import exampleSource from './checkbox-checked.example.vue?raw';

export default createVueSfcPreview({
    label: "Checked",
    title: "Checked example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
