// #region example
import { useState } from 'react';
import { ColorInput } from '@verbb/plugin-kit-react/components';

export function ColorInputBasicExample() {
    const [value, setValue] = useState('#35e533');

    return (
        <ColorInput value={value} onChange={setValue} />
    );
}
// #endregion example

import { colorInputDemoStackStyle, colorInputValueStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

function ColorInputBasicPreview() {
    const [value, setValue] = useState('#35e533');

    return (
        <div style={colorInputDemoStackStyle}>
            <ColorInput value={value} onChange={setValue} />
            <div style={colorInputValueStyle}>
                Value: <code>{value || '(empty)'}</code>
            </div>
        </div>
    );
}

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => <ColorInputBasicPreview />,
};

export default preview;
