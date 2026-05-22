const e=`// #region example
import { Separator } from '@verbb/plugin-kit-react/components';

export function SeparatorVerticalExample() {
    return (
        <div className="flex h-24 items-center gap-4">
            <div>One</div>
            <Separator orientation="vertical" />
            <div>Two</div>
            <Separator orientation="vertical" />
            <div>Three</div>
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const tallRow = { ...rowStyle, height: '96px' };

const preview: PreviewSourceDefinition = {
    label: 'Vertical Separators',
    title: 'Vertical separators example',
    language: 'tsx',
    source: true,
    render: () => (
        <div className="flex items-center gap-4" style={tallRow}>
            <SeparatorVerticalExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
