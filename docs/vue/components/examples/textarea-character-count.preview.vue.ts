import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './textarea-character-count.example.vue';
import exampleSource from './textarea-character-count.example.vue?raw';

export default createVueSfcPreview({
    label: "Character Count",
    title: "Textarea character count example",
    example: Example,
    source: exampleSource,
});
