import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { CheckboxInput } from '@verbb/plugin-kit-react/components';

export function CheckboxInputBasicExample() {
    return (
        <CheckboxInput label="Enable notifications" />
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
            <CheckboxInputBasicExample />
        </div>
    ),
};

export default preview;
