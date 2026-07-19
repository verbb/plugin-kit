import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './button-group-menu-trigger.example.vue';
import exampleSource from './button-group-menu-trigger.example.vue?raw';

export default createVueSfcPreview({
    label: 'Menu Trigger',
    title: 'Menu trigger (`groupTrigger`) example',
    example: Example,
    source: exampleSource,
});
