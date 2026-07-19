import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './radio-group-disabled-options.example.vue';
import exampleSource from './radio-group-disabled-options.example.vue?raw';

export default createVueSfcPreview({
    label: "Disabled Options",
    title: "Disabled options example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
