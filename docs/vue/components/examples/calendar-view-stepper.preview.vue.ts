import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './calendar-view-stepper.example.vue';
import exampleSource from './calendar-view-stepper.example.vue?raw';

export default createVueSfcPreview({
    label: "View Stepper",
    title: "View stepper example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
