const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';
import { useState } from 'react';

// #region example
import { CodeEditor } from '@verbb/plugin-kit-react/components';

export function CodeEditorBasicExample() {
    const [value, setValue] = useState('<p>Hello <strong>world</strong></p>');

    return (
        <CodeEditor
            value={value}
            onChange={setValue}
            language="html"
            rows={8}
        />
    );
}
// #endregion example

const narrow = { maxWidth: '640px' };

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrow}>
            <CodeEditorBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
