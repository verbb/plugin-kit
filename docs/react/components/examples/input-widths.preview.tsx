import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function InputWidthsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ maxWidth: '20rem' }}>
                <Input placeholder="Full width by default" />
            </div>

            <Input style={{ width: 220 }} placeholder="Fixed width" />
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Widths',
    title: 'Widths example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <InputWidthsExample />
        </div>
    ),
};

export default preview;
