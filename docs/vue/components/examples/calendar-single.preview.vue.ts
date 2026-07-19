import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './calendar-single.example.vue';
import exampleSource from './calendar-single.example.vue?raw';

export default createVueSfcPreview({
    label: "Single Date",
    title: "Single date example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
