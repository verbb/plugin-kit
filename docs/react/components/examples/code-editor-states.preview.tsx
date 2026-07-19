import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CodeEditor } from '@verbb/plugin-kit-react/components';

const stackStyle = { display: 'flex', flexDirection: 'column', gap: '1rem' } as const;

export function CodeEditorStatesExample() {
    return (
        <div style={stackStyle}>
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

const preview: PreviewSourceDefinition = {
    label: 'Validation and Read-only',
    title: 'Validation and read-only states',
    language: 'tsx',
    source: true,
    render: () => <CodeEditorStatesExample />,
};

export default preview;
