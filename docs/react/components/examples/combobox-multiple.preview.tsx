// #region example
import { Combobox, Option } from '@verbb/plugin-kit-react/components';

export function ComboboxMultipleExample() {
    return (
        <Combobox multiple placeholder="Add frameworks…" values={['next-js']}>
            <Option value="next-js">Next.js</Option>
            <Option value="sveltekit">SvelteKit</Option>
            <Option value="nuxt-js">Nuxt.js</Option>
            <Option value="remix">Remix</Option>
            <Option value="astro">Astro</Option>
        </Combobox>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Multiple Selection',
    title: 'Multiple selection example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxMultipleExample />
        </div>
    ),
};

export default preview;
