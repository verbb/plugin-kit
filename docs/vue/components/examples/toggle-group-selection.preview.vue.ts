import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './toggle-group-selection.example.vue';
import exampleSource from './toggle-group-selection.example.vue?raw';

export default createVueSfcPreview({
    label: 'Selection Modes',
    title: 'Toggle group selection mode examples',
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
