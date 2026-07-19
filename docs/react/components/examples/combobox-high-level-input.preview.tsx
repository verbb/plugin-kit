// #region example
import { useCallback, useState } from 'react';
import { Button, ComboboxInput } from '@verbb/plugin-kit-react/components';

const frameworks = [
    { label: 'Next.js', value: 'next-js' },
    { label: 'SvelteKit', value: 'sveltekit' },
    { label: 'Nuxt.js', value: 'nuxt-js' },
    { label: 'Remix', value: 'remix' },
    { label: 'Astro', value: 'astro' },
];

export function ComboboxHighLevelInputExample() {
    const [frameworkValue, setFrameworkValue] = useState(frameworks[0]?.value ?? '');
    const [asyncDelayMs, setAsyncDelayMs] = useState(500);
    const [asyncInputValue, setAsyncInputValue] = useState<string>('');

    const fetchFrameworks = useCallback(async (query: string) => {
        await new Promise((resolve) => {
            setTimeout(resolve, asyncDelayMs);
        });

        const normalized = query.trim().toLowerCase();

        if (!normalized) {
            return [];
        }

        return frameworks.filter((framework) => {
            return framework.label.toLowerCase().includes(normalized);
        });
    }, [asyncDelayMs]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ComboboxInput
                options={frameworks}
                value={frameworkValue}
                onValueChange={(nextValue) => setFrameworkValue(String(nextValue ?? ''))}
                placeholder="Select a framework"
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                <Button type="button" variant={asyncDelayMs === 500 ? 'primary' : 'outline'} onClick={() => { setAsyncDelayMs(500); }}>
                    0.5s
                </Button>
                <Button type="button" variant={asyncDelayMs === 3000 ? 'primary' : 'outline'} onClick={() => { setAsyncDelayMs(3000); }}>
                    3s
                </Button>
                <span style={{ fontSize: 12, color: '#64748b' }}>Current delay: {asyncDelayMs}ms</span>
            </div>

            <ComboboxInput
                fetchOptions={fetchFrameworks}
                value={asyncInputValue}
                onValueChange={(nextValue) => setAsyncInputValue(String(nextValue ?? ''))}
                placeholder="Search frameworks"
                startTypingMessage="Start typing to search frameworks…"
            />
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Higher-Level Input API',
    title: 'Higher-level input API example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxHighLevelInputExample />
        </div>
    ),
};

export default preview;
