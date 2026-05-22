import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Input } from '@verbb/plugin-kit-react/components';

export function InputWidthsExample() {
    return (
        <div className="space-y-3">
            <div className="max-w-sm">
                <Input placeholder="Full width by default" />
            </div>

            <Input className="w-[220px]" placeholder="Fixed width" />
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
