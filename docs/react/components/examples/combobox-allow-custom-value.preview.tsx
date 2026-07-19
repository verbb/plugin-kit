import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Combobox, Option } from '@verbb/plugin-kit-react/components';

export function ComboboxAllowCustomValueExample() {
    return (
        <Combobox allowCustomValue placeholder="Type or select a color…" style={{ minWidth: '16rem' }}>
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
        </Combobox>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Custom Values',
    title: 'Allow custom value example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxAllowCustomValueExample />
        </div>
    ),
};

export default preview;
