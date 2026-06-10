import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { CodeEditor } from '@verbb/plugin-kit-react/components';

export function CodeEditorStatesExample() {
    return (
        <div className="flex flex-col gap-4">
            <CodeEditor
                value={'<p>Invalid markup</p>'}
                onChange={() => {}}
                isInvalid
                rows={4}
            />
            <CodeEditor
                value={'<p>Read-only content</p>'}
                onChange={() => {}}
                readOnly
                rows={4}
            />
        </div>
    );
}
// #endregion example

const narrow = { maxWidth: '640px' };

const preview: PreviewSourceDefinition = {
    label: 'Validation and Read-only',
    title: 'Validation and read-only states',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrow}>
            <CodeEditorStatesExample />
        </div>
    ),
};

export default preview;
