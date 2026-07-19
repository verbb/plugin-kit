import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Checkbox } from '@verbb/plugin-kit-react/components';

export function CheckboxCheckedExample() {
    return (
        <Checkbox checked aria-label="Enable notifications" />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Checked',
    title: 'Checked example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <CheckboxCheckedExample />
        </div>
    ),
};

export default preview;
