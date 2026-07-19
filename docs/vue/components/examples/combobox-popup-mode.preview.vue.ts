import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './combobox-popup-mode.example.vue';
import exampleSource from './combobox-popup-mode.example.vue?raw';

export default createVueSfcPreview({
    label: "Popup Mode",
    title: "Popup mode example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
