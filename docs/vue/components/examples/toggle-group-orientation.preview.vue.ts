import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './toggle-group-orientation.example.vue';
import exampleSource from './toggle-group-orientation.example.vue?raw';

export default createVueSfcPreview({
    label: 'Orientation',
    title: 'Orientation example',
    example: Example,
    source: exampleSource,
    wrapStyle: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '32px',
    },
});
