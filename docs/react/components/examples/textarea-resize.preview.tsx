import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaResizeExample() {
    return (
        <Textarea value={'Try dragging the resize handle.\n\nIt should resize vertically.'} />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Resize',
    title: 'Resize example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TextareaResizeExample />
        </div>
    ),
};

export default preview;
