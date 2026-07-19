// #region example
import { Combobox, Option } from '@verbb/plugin-kit-react/components';

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
];

function FruitOptions() {
    return fruits.map((fruit) => (
        <Option key={fruit.value} value={fruit.value}>{fruit.label}</Option>
    ));
}

export function ComboboxWidthsExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Combobox placeholder="Select a fruit" style={{ width: '100%', maxWidth: '20rem' }}>
                <FruitOptions />
            </Combobox>
            <Combobox placeholder="Select a fruit" style={{ width: '12rem' }}>
                <FruitOptions />
            </Combobox>
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Widths',
    title: 'Widths example',
    language: 'tsx',
    source: true,
    render: () => <ComboboxWidthsExample />,
};

export default preview;
