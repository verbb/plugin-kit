import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './lightswitch-checked.example.vue';
import exampleSource from './lightswitch-checked.example.vue?raw';

export default createVueSfcPreview({
    label: "Checked",
    title: "Checked example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
