import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './tooltip-keyboard.example.vue';
import exampleSource from './tooltip-keyboard.example.vue?raw';

export default createVueSfcPreview({
    label: 'Keyboard Trigger',
    title: 'Keyboard-accessible tooltip example',
    example: Example,
    source: exampleSource,
});
