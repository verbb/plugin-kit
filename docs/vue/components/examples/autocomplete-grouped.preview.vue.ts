import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './autocomplete-grouped.example.vue';
import exampleSource from './autocomplete-grouped.example.vue?raw';

export default createVueSfcPreview({
    label: 'Grouped',
    title: 'Grouped aliases and env vars',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
