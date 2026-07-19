import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Textarea } from '@verbb/plugin-kit-react/components';

export function TextareaWidthsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ maxWidth: '24rem' }}>
                <Textarea placeholder="Full width by default" />
            </div>
            <Textarea style={{ width: 320 }} placeholder="Fixed width" />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Widths',
    title: 'Widths example',
    language: 'tsx',
    source: true,
    render: () => <TextareaWidthsExample />,
};

export default preview;
