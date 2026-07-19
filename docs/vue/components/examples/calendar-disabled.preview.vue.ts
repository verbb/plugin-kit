import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './calendar-disabled.example.vue';
import exampleSource from './calendar-disabled.example.vue?raw';

export default createVueSfcPreview({
    label: "Disabled Days",
    title: "Disabled days example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
