// #region example
import {
    Option,
    OptionGroup,
    Select,
    Separator,
} from '@verbb/plugin-kit-react/components';

export function SelectGroupedExample() {
    return (
        <Select placeholder="Select produce">
            <OptionGroup label="Fruits">
                <Option value="apple">Apple</Option>
                <Option value="banana">Banana</Option>
                <Option value="blueberry">Blueberry</Option>
                <Option value="grapes">Grapes</Option>
                <Option value="pineapple">Pineapple</Option>
            </OptionGroup>
            <Separator />
            <OptionGroup label="Vegetables">
                <Option value="carrot">Carrot</Option>
                <Option value="broccoli">Broccoli</Option>
            </OptionGroup>
        </Select>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Grouped Options',
    title: 'Grouped options example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <SelectGroupedExample />
        </div>
    ),
};

export default preview;
