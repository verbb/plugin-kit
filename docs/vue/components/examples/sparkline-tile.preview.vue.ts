import { createVueSfcPreview } from '../../../.vitepress/theme/components/createVueSfcPreview';
import Example from './sparkline-tile.example.vue';
import exampleSource from './sparkline-tile.example.vue?raw';

export default createVueSfcPreview({
    label: 'Stat Tile',
    title: 'A stat tile built by a plugin',
    example: Example,
    source: exampleSource,
});
