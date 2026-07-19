import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './textarea-disabled.example.vue';
import exampleSource from './textarea-disabled.example.vue?raw';

export default createVueSfcPreview({
    label: "Disabled",
    title: "Disabled example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
