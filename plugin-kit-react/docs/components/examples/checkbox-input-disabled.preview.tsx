import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputDisabledExample() {
    return (
        <div className="space-y-3">
            <CheckboxInput label="Offline mode" disabled />
            <CheckboxInput label="Auto-save enabled" defaultChecked disabled />
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
        <div style={stackStyle}>
            <CheckboxInputDisabledExample />
        </div>
    ),
};

export default preview;
