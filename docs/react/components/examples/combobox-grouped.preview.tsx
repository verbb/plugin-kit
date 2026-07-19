// #region example
import { Combobox, Option, OptionGroup, Separator } from '@verbb/plugin-kit-react/components';

export function ComboboxGroupedExample() {
    return (
        <Combobox placeholder="Select produce…">
            <OptionGroup label="Fruits">
                <Option value="apple">Apple</Option>
                <Option value="banana">Banana</Option>
            </OptionGroup>
            <Separator />
            <OptionGroup label="Vegetables">
                <Option value="carrot">Carrot</Option>
                <Option value="broccoli">Broccoli</Option>
            </OptionGroup>
        </Combobox>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Grouped Options',
    title: 'Grouped options example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxGroupedExample />
        </div>
    ),
};

export default preview;
