import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { Combobox, Option } from '@verbb/plugin-kit-react/components';

export function ComboboxAllowCreateExample() {
    return (
        <Combobox allowCreate placeholder="Search or create tags…" style={{ minWidth: '16rem' }}>
            <Option value="design">Design</Option>
            <Option value="engineering">Engineering</Option>
            <Option value="marketing">Marketing</Option>
        </Combobox>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Allow Create',
    title: 'Allow create example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxAllowCreateExample />
        </div>
    ),
};

export default preview;
