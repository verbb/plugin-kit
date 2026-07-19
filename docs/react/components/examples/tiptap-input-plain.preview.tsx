import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';

export function TiptapInputPlainExample() {
    const [value, setValue] = useState('Hello world');

    return (
        <TiptapInput
            value={value}
            onChange={setValue}
            placeholder="Write something"
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Plain Input',
    title: 'Plain input example',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputPlainExample />,
};

export default preview;
