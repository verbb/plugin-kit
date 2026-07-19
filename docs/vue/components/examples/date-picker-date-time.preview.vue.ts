import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { rowStyle } from './exampleStyles';
import Example from './date-picker-date-time.example.vue';
import exampleSource from './date-picker-date-time.example.vue?raw';

export default createVueSfcPreview({
    label: "Date and Time",
    title: "Date and time example",
    example: Example,
    source: exampleSource,
    wrapStyle: rowStyle,
});
