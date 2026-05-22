import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaResizeExample() {
    return (
        <Textarea
            defaultValue={'Try dragging the resize handle.\n\nIt should resize vertically.'}
        />
    );
}
// #endregion example

const narrow = { maxWidth: '520px' };

const preview: PreviewSourceDefinition = {
    label: 'Resize',
    title: 'Resize example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={narrow}>
            <TextareaResizeExample />
        </div>
    ),
};

export default preview;
