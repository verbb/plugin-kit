import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './radio-group-basic.example.vue';
import exampleSource from './radio-group-basic.example.vue?raw';

export default createVueSfcPreview({
    label: "Basic Usage",
    title: "Basic usage example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
