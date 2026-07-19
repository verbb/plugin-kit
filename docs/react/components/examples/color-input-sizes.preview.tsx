// #region example
import { useState, type CSSProperties } from 'react';
import { ColorInput } from '@verbb/plugin-kit-react/components';

const sizes = ['xs', 'sm', 'default', 'lg', 'xl'] as const;

function StatefulColorInput({ size }: { size: (typeof sizes)[number] }) {
    const [value, setValue] = useState('#35e533');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ColorInput value={value} onChange={setValue} size={size} />
            <div style={{ fontSize: 11, color: '#4b5563' }}>
                Value: <code>{value || '(empty)'}</code>
            </div>
        </div>
    );
}

export function ColorInputSizesExample() {
    const row: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sizes.map((size) => (
                <div key={size} style={row}>
                    <div style={{ width: 64, fontSize: 12, color: '#64748b' }}>{size}</div>
                    <StatefulColorInput size={size} />
                </div>
            ))}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => <ColorInputSizesExample />,
};

export default preview;
