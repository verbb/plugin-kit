import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';
import type { ToolbarNode } from '@verbb/plugin-kit-tiptap-core';

const groupedToolbar: ToolbarNode[] = [
    {
        type: 'group',
        group: {
            label: 'Text style',
            icon: 'bold',
            items: ['paragraph', '|', 'h2', 'bold', 'italic', 'underline', 'small-caps'],
        },
    },
    { type: 'separator' },
    { type: 'group', group: { preset: 'lists' } },
    { type: 'group', group: { preset: 'align' } },
    { type: 'button', name: 'link' },
    { type: 'button', name: 'undo' },
    { type: 'button', name: 'redo' },
];

const initialValue = JSON.stringify([
    { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Grouped Toolbar Demo' }] },
    {
        type: 'paragraph',
        content: [
            { type: 'text', text: 'Mix custom groups, preset groups, and standalone controls.' },
        ],
    },
]);

export function TiptapEditorGroupedToolbarExample() {
    const [value, setValue] = useState(initialValue);

    return (
        <div style={{ maxWidth: 800 }}>
            <TiptapEditor
                value={value}
                onChange={setValue}
                placeholder="Try grouped toolbar controls"
                toolbar={groupedToolbar}
            />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Grouped Toolbar',
    title: 'Grouped toolbar example',
    language: 'tsx',
    source: true,
    render: () => <TiptapEditorGroupedToolbarExample />,
};

export default preview;
