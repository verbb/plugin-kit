// #region example
import { CopyButton, Icon, Input } from '@verbb/plugin-kit-react/components';

export function CopyButtonBasicExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Input value="https://verbb.io" readonly style={{ width: '16rem' }} />
            <CopyButton value="https://verbb.io">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

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
