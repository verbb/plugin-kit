// #region example
import { Separator } from '@verbb/plugin-kit-react/components';

export function SeparatorVerticalExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: '2rem' }}>
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Center</span>
            <Separator orientation="vertical" />
            <span>Right</span>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Vertical Separators',
    title: 'Vertical separators example',
    language: 'tsx',
    source: true,
    render: () => <SeparatorVerticalExample />,
};

export default preview;
