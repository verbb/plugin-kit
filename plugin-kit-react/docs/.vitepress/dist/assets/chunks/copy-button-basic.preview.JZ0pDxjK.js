const e=`// #region example
import { CopyButton, Input } from '@verbb/plugin-kit-react/components';

export function CopyButtonBasicExample() {
    return (
        <div className="flex items-center gap-2">
            <Input value="https://verbb.io" readOnly className="w-64" />
            <CopyButton value="https://verbb.io" />
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <CopyButtonBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
