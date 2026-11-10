import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './sparkline-table.example.vue';
import exampleSource from './sparkline-table.example.vue?raw';

export default createVueSfcPreview({
    label: 'In a Table',
    title: 'Sparklines in table cells',
    example: Example,
    source: exampleSource,
});
