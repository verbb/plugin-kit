// #region example
import { Separator } from '@verbb/plugin-kit-react/components';

export function SeparatorHorizontalExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>Section A</div>
            <Separator />
            <div>Section B</div>
            <Separator />
            <div>Section C</div>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Horizontal Separators',
    title: 'Horizontal separators example',
    language: 'tsx',
    source: true,
    render: () => <SeparatorHorizontalExample />,
};

export default preview;
