const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { TiptapContent } from '@verbb/plugin-kit-react/components';

const value = [
    {
        type: 'paragraph',
        content: [
            { type: 'text', text: 'Preview ' },
            { type: 'text', marks: [{ type: 'bold' }], text: 'content' },
            { type: 'text', text: ' without a toolbar.' },
        ],
    },
];

export function TiptapContentBasicExample() {
    return <TiptapContent value={value} />;
}
// #endregion example

const narrow = { maxWidth: '520px' };

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrow}>
            <TiptapContentBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
