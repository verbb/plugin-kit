import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';

const basicButtons = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'h2', 'unordered-list', 'ordered-list'];

const initialValue = JSON.stringify([
    { type: 'paragraph', content: [{ type: 'text', text: 'Hello from the editor.' }] },
]);

export function TiptapEditorBasicExample() {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ maxWidth: 720 }}>
            <TiptapEditor
                value={value}
                onChange={setValue}
                placeholder="Write something"
                buttons={basicButtons}
            />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Editor',
    title: 'Basic editor example',
    language: 'tsx',
    source: true,
    render: () => <TiptapEditorBasicExample />,
};

export default preview;
