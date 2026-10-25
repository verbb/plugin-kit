// #region example
import { useState } from 'react';
import { ImageBrowser } from '@verbb/plugin-kit-react/components';

const items = [
    { value: 'circle', label: 'Circle', preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>' },
    { value: 'square', label: 'Square', preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/></svg>' },
];
const sizes = ['xxs', 'xs', 'sm', 'default', 'lg', 'xl'] as const;

export function ImageBrowserSizesExample() {
    const [values, setValues] = useState<Record<string, string>>({});

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map((size) => (
                <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ width: 64 }}>{size}</span>
                    <ImageBrowser
                        size={size}
                        items={items}
                        value={values[size] ?? 'circle'}
                        aria-label={`${size} icon`}
                        withClear
                        onChange={(value) => setValues((current) => ({ ...current, [size]: value }))}
                    />
                </div>
            ))}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Image browser sizes',
    language: 'tsx',
    source: true,
    render: () => <ImageBrowserSizesExample />,
};

export default preview;
