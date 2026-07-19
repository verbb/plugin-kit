import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';

const advancedButtons = [
    'h1', 'h2', 'h3',
    'bold', 'italic', 'underline', 'strikethrough',
    'unordered-list', 'ordered-list', 'blockquote',
    'code', 'code-block', 'link', 'table', 'variableTag', 'undo', 'redo',
];

const initialValue = JSON.stringify([
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Kitchen Sink Demo' }] },
    {
        type: 'paragraph',
        content: [
            { type: 'text', text: 'This editor exposes more advanced formatting options including ' },
            {
                type: 'text',
                marks: [{ type: 'link', attrs: { href: 'https://verbb.io' } }],
                text: 'links',
            },
            { type: 'text', text: ', tables, code blocks, and variables. Click a link to edit or unlink it.' },
        ],
    },
]);

export function TiptapEditorExpandedToolbarExample() {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ maxWidth: 800 }}>
            <TiptapEditor
                value={value}
                onChange={setValue}
                placeholder="Try all the formatting options"
                buttons={advancedButtons}
            />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Expanded Toolbar',
    title: 'Expanded toolbar example',
    language: 'tsx',
    source: true,
    render: () => <TiptapEditorExpandedToolbarExample />,
};

export default preview;
