import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputDisabledExample() {
    return (
        <CheckboxInput label="Enable notifications" disabled />
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
