import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tabs-disabled-overflow.example.vue';
import exampleSource from './tabs-disabled-overflow.example.vue?raw';

export default createVueSfcPreview({
    label: 'Disabled and Overflow',
    title: 'Disabled and overflowing tabs example',
    example: Example,
    source: exampleSource,
});
