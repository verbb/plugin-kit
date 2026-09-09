// #region example
import { CopyButton, Icon, Input } from '@verbb/plugin-kit-react/components';

export function CopyButtonBasicExample() {
    return (
        <Input value="https://verbb.io" readonly style={{ width: '16rem' }}>
            <CopyButton slot="end" value="https://verbb.io">
                <Icon slot="icon" icon="clipboard" aria-hidden="true" />
            </CopyButton>
        </Input>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'In-control copy action',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CopyButtonBasicExample />
        </div>
    ),
};

export default preview;
