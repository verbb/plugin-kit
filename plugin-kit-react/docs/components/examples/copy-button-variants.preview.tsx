// #region example
import { CopyButton, Input } from '@verbb/plugin-kit-react/components';

const value = 'FORMIE_LICENSE_KEY';

export function CopyButtonVariantsExample() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <Input value={value} readOnly className="w-64" />
                <CopyButton value={value} />
            </div>
            <div className="flex items-center gap-2">
                <CopyButton value={value} variant="outline" />
                <CopyButton value={value} variant="transparent" />
                <CopyButton value={value} variant="none" />
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Variants',
    title: 'Copy button variant examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CopyButtonVariantsExample />
        </div>
    ),
};

export default preview;
