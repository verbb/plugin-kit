import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Checkbox } from '@verbb/plugin-kit-react/components';

export function CheckboxDisabledExample() {
    return (
        <div className="flex items-center gap-3">
            <Checkbox disabled aria-label="Offline mode" />
            <Checkbox defaultChecked disabled aria-label="Auto-save enabled" />
        </div>
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
