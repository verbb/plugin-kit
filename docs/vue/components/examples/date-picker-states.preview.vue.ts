import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './date-picker-states.example.vue';
import exampleSource from './date-picker-states.example.vue?raw';

export default createVueSfcPreview({
    label: "States",
    title: "Date picker state examples",
    example: Example,
    source: exampleSource,
});
