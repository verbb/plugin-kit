// #region example
import { Icon } from '@verbb/plugin-kit-react/components';

export function IconSizingExample() {
    return (
        <>
            <Icon icon="gear" style={{ fontSize: 12 }} />
            <Icon icon="gear" style={{ fontSize: 16 }} />
            <Icon icon="gear" style={{ fontSize: 20 }} />
            <Icon icon="gear" style={{ fontSize: 24 }} />
            <Icon icon="gear" style={{ fontSize: 32 }} />
            <Icon icon="gear" style={{ fontSize: 48 }} />
        </>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizing',
    title: 'Sizing example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={{ ...rowStyle, alignItems: 'flex-end' }}>
            <IconSizingExample />
        </div>
    ),
};

export default preview;
