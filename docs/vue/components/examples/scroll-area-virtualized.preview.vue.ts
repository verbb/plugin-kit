import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './scroll-area-virtualized.example.vue';
import exampleSource from './scroll-area-virtualized.example.vue?raw';

export default createVueSfcPreview({
    label: 'Long Lists',
    title: 'Long lists example',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
