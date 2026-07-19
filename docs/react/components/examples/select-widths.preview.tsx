// #region example
import { Option, Select } from '@verbb/plugin-kit-react/components';

export function SelectWidthsExample() {
    return (
        <>
            <Select placeholder="Select a fruit" width="full" style={{ maxWidth: '20rem' }}>
                <Option value="apple">Apple</Option>
                <Option value="banana">Banana</Option>
                <Option value="blueberry">Blueberry</Option>
                <Option value="grapes">Grapes</Option>
                <Option value="pineapple">Pineapple</Option>
            </Select>
            <Select placeholder="Select a fruit" style={{ width: '12rem' }}>
                <Option value="apple">Apple</Option>
                <Option value="banana">Banana</Option>
                <Option value="blueberry">Blueberry</Option>
                <Option value="grapes">Grapes</Option>
                <Option value="pineapple">Pineapple</Option>
            </Select>
        </>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Widths',
    title: 'Widths example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <SelectWidthsExample />
        </div>
    ),
};

export default preview;
