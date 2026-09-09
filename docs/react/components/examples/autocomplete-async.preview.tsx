import { useCallback, useState } from 'react';
import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Autocomplete } from '@verbb/plugin-kit-react/components';

const paths = [
    { value: '@webroot/', label: '@webroot/' },
    { value: '@webroot/assets/', label: '@webroot/assets/' },
    { value: '@webroot/cpnav-icons/', label: '@webroot/cpnav-icons/' },
    { value: '@webroot/uploads/', label: '@webroot/uploads/' },
    { value: '@storage/', label: '@storage/' },
    { value: '@storage/runtime/', label: '@storage/runtime/' },
    { value: '@templates/', label: '@templates/' },
    { value: '@config/', label: '@config/' },
    { value: '$PRIMARY_SITE_URL', label: '$PRIMARY_SITE_URL' },
    { value: '$CRAFT_WEB_ROOT', label: '$CRAFT_WEB_ROOT' },
];

export function AutocompleteAsyncExample() {
    const [value, setValue] = useState('@webroot/');

    const fetchOptions = useCallback(async (query: string) => {
        await new Promise((resolve) => {
            window.setTimeout(resolve, 280);
        });

        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return [];
        }

        return paths.filter((item) => item.label.toLowerCase().includes(normalized));
    }, []);

    return (
        <Autocomplete
            async
            clearable
            width="full"
            placeholder="Search aliases and paths…"
            startTypingMessage="Start typing to search paths…"
            value={value}
            onChange={setValue}
            fetchOptions={fetchOptions}
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Async',
    title: 'Async path suggestions',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <AutocompleteAsyncExample />
        </div>
    ),
};

export default preview;
