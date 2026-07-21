// #region example
import { useState } from 'react';
import { ColorInput } from '@verbb/plugin-kit-react/components';

export function ColorInputStatesExample() {
    const [value, setValue] = useState('#e64d4c');

    return (
        <>
            <ColorInput value={value} onChange={setValue} />
            <ColorInput value="#ff" isInvalid />
            <ColorInput value="#64748b" readOnly />
            <ColorInput value="#64748b" disabled />
        </>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'States',
    title: 'Color input state examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ColorInputStatesExample />
        </div>
    ),
};

export default preview;
