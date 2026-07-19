import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import { stackStyle } from './exampleStyles';
import Example from './checkbox-select-long-list.example.vue';
import exampleSource from './checkbox-select-long-list.example.vue?raw';

export default createVueSfcPreview({
    label: "Long Lists",
    title: "Checkbox select long list example",
    example: Example,
    source: exampleSource,
    wrapStyle: stackStyle,
});
