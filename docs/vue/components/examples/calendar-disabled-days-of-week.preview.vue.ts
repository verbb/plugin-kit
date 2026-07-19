import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './calendar-disabled-days-of-week.example.vue';
import exampleSource from './calendar-disabled-days-of-week.example.vue?raw';

export default createVueSfcPreview({
    label: "Days of Week",
    title: "Disabled days of week example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
