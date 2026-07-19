import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './checkbox-disabled.example.vue';
import exampleSource from './checkbox-disabled.example.vue?raw';

export default createVueSfcPreview({
    label: "Disabled",
    title: "Disabled example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
