const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState, type ComponentProps } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';

type TiptapValue = NonNullable<ComponentProps<typeof TiptapEditor>['value']>;

const advancedButtons: string[] = [
    'h1', 'h2', 'h3',
    'bold', 'italic', 'underline', 'strikethrough',
    'unordered-list', 'ordered-list', 'blockquote',
    'code', 'code-block', 'link', 'table', 'variableTag', 'undo', 'redo',
];

export function TiptapEditorExpandedToolbarExample() {
    const [value, setValue] = useState<TiptapValue>([
        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Kitchen Sink Demo' }] },
        {
            type: 'paragraph',
            content: [
                { type: 'text', text: 'This editor exposes more advanced formatting options including links, tables, code blocks, and variables.' },
            ],
        },
    ]);

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
`;export{e as default};
