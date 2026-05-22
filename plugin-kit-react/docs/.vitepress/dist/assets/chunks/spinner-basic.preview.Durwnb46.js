const e=`// #region example
import { Spinner } from '@verbb/plugin-kit-react/components';

export function SpinnerBasicExample() {
    return (
        <Spinner />
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic spinner example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <SpinnerBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
