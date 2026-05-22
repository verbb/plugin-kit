const e=`// #region example
import { Spinner } from '@verbb/plugin-kit-react/components';

export function SpinnerColorsExample() {
    return (
        <div className="flex flex-wrap items-center gap-5">
            <Spinner className="border-t-sky-600 border-r-sky-600" />
            <Spinner className="border-t-emerald-600 border-r-emerald-600" />
            <Spinner className="border-t-violet-600 border-r-violet-600" />
            <Spinner className="border-t-amber-500 border-r-amber-500" />
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Colors',
    title: 'Spinner color examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <SpinnerColorsExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
