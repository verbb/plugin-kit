import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './time-picker-states.example.vue';
import exampleSource from './time-picker-states.example.vue?raw';

export default createVueSfcPreview({
    label: "States",
    title: "Time picker state examples",
    example: Example,
    source: exampleSource,
});
