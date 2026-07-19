import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaBasicExample() {
    return <Textarea placeholder="Write something..." />;
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TextareaBasicExample />
        </div>
    ),
};

export default preview;
