// #region example
import { Icon } from '@verbb/plugin-kit-react/components';

export function IconAccessibilityExample() {
    return (
        <>
            <Icon icon="trash" />
            <Icon icon="trash" label="Delete" />
        </>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Accessibility',
    title: 'Accessibility example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <IconAccessibilityExample />
        </div>
    ),
};

export default preview;
