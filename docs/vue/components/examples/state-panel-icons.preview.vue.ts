import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
import Example from './state-panel-icons.example.vue';
import exampleSource from './state-panel-icons.example.vue?raw';

const preview: PreviewSourceDefinition = {
    label: 'Icons',
    title: 'State panel icon options',
    language: 'vue',
    source: exampleSource,
    render: () => Example,
};

export default preview;
