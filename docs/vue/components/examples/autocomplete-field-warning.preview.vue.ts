import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './autocomplete-field-warning.example.vue';
import exampleSource from './autocomplete-field-warning.example.vue?raw';

export default createVueSfcPreview({
    label: 'Field warning',
    title: 'Missing path warning',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
