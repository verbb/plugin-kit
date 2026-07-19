import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './lightswitch-disabled.example.vue';
import exampleSource from './lightswitch-disabled.example.vue?raw';

export default createVueSfcPreview({
    label: "Disabled",
    title: "Disabled example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
