// #region example
import { useState, type CSSProperties } from 'react';
import { ColorInput } from '@verbb/plugin-kit-react/components';

function StatefulColorInput({
    initialValue = '',
    isInvalid = false,
    disabled = false,
}: {
    initialValue?: string;
    isInvalid?: boolean;
    disabled?: boolean;
}) {
    const [value, setValue] = useState(initialValue);

    return (
        <ColorInput
            value={value}
            onValueChange={setValue}
            isInvalid={isInvalid}
            disabled={disabled}
        />
    );
}

export function ColorInputResolvedExample() {
    const stack: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 420,
    };

    return (
        <div style={stack}>
            <StatefulColorInput initialValue="" />
            <StatefulColorInput initialValue="#a9" />
            <StatefulColorInput initialValue="#9c4" />
            <StatefulColorInput initialValue="#35e533" />
            <StatefulColorInput initialValue="#35e533" isInvalid />
            <StatefulColorInput initialValue="#35e533" disabled />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

function StatefulColorInputPreview({
    initialValue = '',
    isInvalid = false,
    disabled = false,
}: {
    initialValue?: string;
    isInvalid?: boolean;
    disabled?: boolean;
}) {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ColorInput
                value={value}
                onValueChange={setValue}
                isInvalid={isInvalid}
                disabled={disabled}
            />
            <div style={{ fontSize: 11, color: '#4b5563' }}>
                Value: <code>{value || '(empty)'}</code>
            </div>
        </div>
    );
}

function ColorInputResolvedPreview() {
    const stack: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 420,
    };

    return (
        <div style={stack}>
            <StatefulColorInputPreview initialValue="" />
            <StatefulColorInputPreview initialValue="#a9" />
            <StatefulColorInputPreview initialValue="#9c4" />
            <StatefulColorInputPreview initialValue="#35e533" />
            <StatefulColorInputPreview initialValue="#35e533" isInvalid />
            <StatefulColorInputPreview initialValue="#35e533" disabled />
        </div>
    );
}

const preview: PreviewSourceDefinition = {
    label: 'Resolved Values',
    title: 'Resolved values example',
    language: 'tsx',
    source: true,
    render: () => <ColorInputResolvedPreview />,
};

export default preview;
