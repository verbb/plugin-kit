import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState, type ComponentProps } from 'react';
import { TiptapEditor } from '@verbb/plugin-kit-react/components';

type TiptapValue = NonNullable<ComponentProps<typeof TiptapEditor>['value']>;

export function TiptapEditorVariableInsertionExample() {
    const [value, setValue] = useState<TiptapValue>([
        { type: 'paragraph', content: [{ type: 'text', text: 'Use the variable dropdown to insert dynamic values.' }] },
    ]);

    return (
        <div style={{ maxWidth: 720 }}>
            <TiptapEditor
                value={value}
                onChange={setValue}
                placeholder="Insert variables"
                buttons={['bold', 'italic', 'variableTag']}
                variableCategories={{
                    emailVariables: [
                        { label: 'User Email', value: '{userEmail}' },
                        { label: 'System Email', value: '{systemEmail}' },
                    ],
                    plainTextVariables: [
                        { label: 'Form Name', value: '{formName}' },
                        { label: 'Timestamp', value: '{timestamp}' },
                    ],
                }}
            />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Variable Insertion',
    title: 'Variable insertion example',
    language: 'tsx',
    source: true,
    render: () => <TiptapEditorVariableInsertionExample />,
};

export default preview;
