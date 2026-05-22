// #region example
import { Separator } from '@verbb/plugin-kit-react/components';

const boxStyle = { width: '384px' };

export function SeparatorHorizontalExample() {
    return (
        <div className="space-y-4" style={boxStyle}>
            <div>Section A</div>
            <Separator />
            <div>Section B</div>
            <Separator />
            <div>Section C</div>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Horizontal Separators',
    title: 'Horizontal separators example',
    language: 'tsx',
    source: true,
    render: () => <SeparatorHorizontalExample />,
};

export default preview;
