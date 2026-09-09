import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './autocomplete-clearable.example.vue';
import exampleSource from './autocomplete-clearable.example.vue?raw';

export default createVueSfcPreview({
    label: 'Clearable',
    title: 'Clearable autocomplete',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
