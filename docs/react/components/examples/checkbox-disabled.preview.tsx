import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Checkbox } from '@verbb/plugin-kit-react/components';

export function CheckboxDisabledExample() {
    return (
        <Checkbox disabled aria-label="Enable notifications" />
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
            <CheckboxDisabledExample />
        </div>
    ),
};

export default preview;
