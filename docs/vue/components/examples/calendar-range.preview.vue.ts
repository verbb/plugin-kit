import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './calendar-range.example.vue';
import exampleSource from './calendar-range.example.vue?raw';

export default createVueSfcPreview({
    label: "Date Ranges",
    title: "Date ranges example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
