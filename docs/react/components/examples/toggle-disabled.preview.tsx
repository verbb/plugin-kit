import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Icon, Toggle } from '@verbb/plugin-kit-react/components';

export function ToggleDisabledExample() {
    return (
        <Toggle disabled>
            <Icon icon="bold" />
            {' '}
            Bold
        </Toggle>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Disabled',
    title: 'Disabled example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <ToggleDisabledExample />
        </div>
    ),
};

export default preview;
