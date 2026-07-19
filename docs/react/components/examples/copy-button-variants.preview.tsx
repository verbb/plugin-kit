// #region example
import { CopyButton, Icon, Input } from '@verbb/plugin-kit-react/components';

const value = 'FORMIE_LICENSE_KEY';

export function CopyButtonVariantsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Input value={value} readonly style={{ width: '16rem' }} />
                <CopyButton value={value}>
                    <Icon slot="icon" icon="clipboard" aria-hidden="true" />
                </CopyButton>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <CopyButton value={value}>
                    <Icon slot="icon" icon="clipboard" aria-hidden="true" />
                </CopyButton>
                <CopyButton value={value} variant="outline">
                    <Icon slot="icon" icon="clipboard" aria-hidden="true" />
                </CopyButton>
                <CopyButton value={value} variant="transparent">
                    <Icon slot="icon" icon="clipboard" aria-hidden="true" />
                </CopyButton>
                <CopyButton value={value} variant="none">
                    <Icon slot="icon" icon="clipboard" aria-hidden="true" />
                </CopyButton>
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

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
