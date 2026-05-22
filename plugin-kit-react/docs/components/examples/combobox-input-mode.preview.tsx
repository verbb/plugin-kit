// #region example
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxPrimitiveInput,
} from '@verbb/plugin-kit-react/components';

const frameworks = [
    { label: 'Next.js', value: 'next-js' },
    { label: 'SvelteKit', value: 'sveltekit' },
    { label: 'Nuxt.js', value: 'nuxt-js' },
    { label: 'Remix', value: 'remix' },
    { label: 'Astro', value: 'astro' },
];

export function ComboboxInputModeExample() {
    return (
        <Combobox
            items={frameworks}
            itemToStringLabel={(item) => item.label}
            itemToStringValue={(item) => item.value}
        >
            <ComboboxPrimitiveInput placeholder="Select a framework" />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.value} value={item}>
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Input Mode',
    title: 'Input mode example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxInputModeExample />
        </div>
    ),
};

export default preview;
