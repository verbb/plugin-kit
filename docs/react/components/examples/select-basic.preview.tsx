// #region example
import { Option, Select } from '@verbb/plugin-kit-react/components';

export function SelectBasicExample() {
    return (
        <Select placeholder="Select a fruit">
            <Option value="apple">Apple</Option>
            <Option value="banana">Banana</Option>
            <Option value="blueberry">Blueberry</Option>
            <Option value="grapes">Grapes</Option>
            <Option value="pineapple">Pineapple</Option>
        </Select>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <SelectBasicExample />
        </div>
    ),
};

export default preview;
