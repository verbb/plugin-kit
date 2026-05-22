const e=`// #region example
import { Spinner } from '@verbb/plugin-kit-react/components';

const wrapStyle = { display: 'flex' as const, flexWrap: 'wrap' as const, alignItems: 'center' as const, gap: '24px' };

export function SpinnerSizesExample() {
    return (
        <div style={wrapStyle}>
            {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => {
                return (
                    <div key={size} className="flex items-center gap-2">
                        <Spinner size={size} />
                        <span className="text-xs text-slate-500">{size}</span>
                    </div>
                );
            })}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => <SpinnerSizesExample />,
};

export default preview;
`;export{e as default};
