import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './tabs-basic.example.vue';
import exampleSource from './tabs-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic Tabs',
    title: 'Basic tabs example',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
