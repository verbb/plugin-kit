import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputDescriptionExample() {
    return (
        <CheckboxInput
            label="Enable notifications"
            description="Receive email when entries are updated."
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Descriptions',
    title: 'Descriptions example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxInputDescriptionExample />
        </div>
    ),
};

export default preview;
