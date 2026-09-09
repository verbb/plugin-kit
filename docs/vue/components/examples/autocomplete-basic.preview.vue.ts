import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './autocomplete-basic.example.vue';
import exampleSource from './autocomplete-basic.example.vue?raw';

export default createVueSfcPreview({
    label: 'Basic',
    title: 'Freeform path suggestions',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
