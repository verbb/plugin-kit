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
    const [frameworkValue, setFrameworkValue] = useState(frameworks[1]?.value ?? '');
    const [asyncDelayMs, setAsyncDelayMs] = useState<number>(500);
    const [asyncInputValue, setAsyncInputValue] = useState<string>('');

    const fetchFrameworks = useCallback(async () => {
        await new Promise((resolve) => { setTimeout(resolve, asyncDelayMs); });
        return frameworks;
    }, [asyncDelayMs]);

    return (
        <div className="space-y-4">
            <ComboboxInput
                options={frameworks}
                value={frameworkValue}
                onValueChange={(nextValue) => setFrameworkValue(String(nextValue ?? ''))}
                placeholder="Select a framework"
            />

            <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant={asyncDelayMs === 500 ? 'primary' : 'outline'} onClick={() => { setAsyncDelayMs(500); }}>
                    0.5s
                </Button>
                <Button type="button" variant={asyncDelayMs === 3000 ? 'primary' : 'outline'} onClick={() => { setAsyncDelayMs(3000); }}>
                    3s
                </Button>
                <span className="text-xs text-slate-500">Current delay: {asyncDelayMs}ms</span>
            </div>

            <ComboboxInput
                fetchOptions={fetchFrameworks}
                value={asyncInputValue}
                onValueChange={(nextValue) => setAsyncInputValue(String(nextValue ?? ''))}
                placeholder="Search frameworks"
            />
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
