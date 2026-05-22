const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaBasicExample() {
    return <Textarea placeholder="Write something..." />;
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
            <TextareaBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
