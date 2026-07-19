import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleBasicExample() {
    return (
        <Toggle aria-label="Bold">
            <Icon icon="bold" />
            Bold
        </Toggle>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleBasicExample />
        </div>
    ),
};

export default preview;
