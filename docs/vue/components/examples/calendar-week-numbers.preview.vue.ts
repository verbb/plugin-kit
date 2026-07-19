import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './calendar-week-numbers.example.vue';
import exampleSource from './calendar-week-numbers.example.vue?raw';

export default createVueSfcPreview({
    label: "Week Numbers",
    title: "Week numbers example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
