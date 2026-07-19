// #region example
import { Spinner } from '@verbb/plugin-kit-react/components';

const wrapStyle = { display: 'flex' as const, flexWrap: 'wrap' as const, alignItems: 'center' as const, gap: '24px' };
const itemStyle = { display: 'flex' as const, alignItems: 'center' as const, gap: '8px' };
const labelStyle = { fontSize: '12px', color: '#64748b' };

export function SpinnerSizesExample() {
    return (
        <div style={wrapStyle}>
            {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => {
                return (
                    <div key={size} style={itemStyle}>
                        <Spinner size={size} />
                        <span style={labelStyle}>{size}</span>
                    </div>
                );
            })}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => <SpinnerSizesExample />,
};

export default preview;
