import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import Example from './state-panel-variants.example.vue';
import exampleSource from './state-panel-variants.example.vue?raw';

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'State panel variants',
    language: 'vue',
    source: exampleSource,
    render: () => Example,
};

export default preview;
