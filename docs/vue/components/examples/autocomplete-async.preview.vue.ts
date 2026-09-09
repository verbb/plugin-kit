import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './autocomplete-async.example.vue';
import exampleSource from './autocomplete-async.example.vue?raw';

export default createVueSfcPreview({
    label: 'Async',
    title: 'Async path suggestions',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
