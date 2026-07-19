import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './calendar-dual-month.example.vue';
import exampleSource from './calendar-dual-month.example.vue?raw';

export default createVueSfcPreview({
    label: "Two-Month Display",
    title: "Two-month display example",
    example: Example,
    source: exampleSource,
});
