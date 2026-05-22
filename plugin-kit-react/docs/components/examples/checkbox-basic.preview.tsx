import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { Checkbox } from '@verbb/plugin-kit-react/components';

export function CheckboxBasicExample() {
    return (
        <Checkbox aria-label="Enable notifications" />
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
            <CheckboxBasicExample />
        </div>
    ),
};

export default preview;
