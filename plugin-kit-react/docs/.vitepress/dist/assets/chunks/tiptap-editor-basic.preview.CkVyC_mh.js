const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState, type ComponentProps } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';

type TiptapValue = NonNullable<ComponentProps<typeof TiptapEditor>['value']>;

const basicButtons: string[] = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'h2', 'unordered-list', 'ordered-list'];

export function TiptapEditorBasicExample() {
    const [value, setValue] = useState<TiptapValue>([
        { type: 'paragraph', content: [{ type: 'text', text: 'Hello from the editor.' }] },
    ]);

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
`;export{e as default};
