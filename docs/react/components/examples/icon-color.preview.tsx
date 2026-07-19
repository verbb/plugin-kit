// #region example
import { Icon } from '@verbb/plugin-kit-react/components';

export function IconColorExample() {
    return (
        <>
            <Icon icon="triangle-exclamation" style={{ color: '#1c2e36', fontSize: 24 }} />
            <Icon icon="triangle-exclamation" style={{ color: '#64748b', fontSize: 24 }} />
            <Icon icon="triangle-exclamation" style={{ color: '#0ea5e9', fontSize: 24 }} />
            <Icon icon="triangle-exclamation" style={{ color: '#10b981', fontSize: 24 }} />
            <Icon icon="triangle-exclamation" style={{ color: '#f59e0b', fontSize: 24 }} />
            <Icon icon="triangle-exclamation" style={{ color: '#ef4444', fontSize: 24 }} />
        </>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Color',
    title: 'Color example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <IconColorExample />
        </div>
    ),
};

export default preview;
