const e=`// #region example
import { useState } from 'react';
import { ColorInput } from '@verbb/plugin-kit-react/components';

export function ColorInputBasicExample() {
    const [value, setValue] = useState('#35e533');

    return (
        <ColorInput value={value} onValueChange={setValue} />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

function ColorInputBasicPreview() {
    const [value, setValue] = useState('#35e533');

    return (
        <div className="flex max-w-sm flex-col gap-4">
            <ColorInput value={value} onValueChange={setValue} />
            <div className="text-xs text-gray-600">
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
`;export{e as default};
