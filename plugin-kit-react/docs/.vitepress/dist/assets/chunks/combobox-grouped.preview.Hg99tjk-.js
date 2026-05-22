const o=`// #region example
import {
    Combobox,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxPrimitiveInput,
} from '@verbb/plugin-kit-react/components';

const produceGroups = [
    {
        value: 'Fruits',
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
        ],
    },
    {
        value: 'Vegetables',
        items: [
            { label: 'Carrot', value: 'carrot' },
            { label: 'Lettuce', value: 'lettuce' },
            { label: 'Spinach', value: 'spinach' },
        ],
    },
];

export function ComboboxGroupedExample() {
    return (
        <Combobox
            items={produceGroups}
            itemToStringLabel={(item) => item.label}
            itemToStringValue={(item) => item.value}
        >
            <ComboboxPrimitiveInput placeholder="Select an item" />
            <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    <ComboboxCollection>
                        {(group) => (
                            <ComboboxGroup key={group.value}>
                                <ComboboxLabel>{group.value}</ComboboxLabel>
                                {group.items.map((item) => (
                                    <ComboboxItem key={item.value} value={item}>
                                        {item.label}
                                    </ComboboxItem>
                                ))}
                            </ComboboxGroup>
                        )}
                    </ComboboxCollection>
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
`;export{o as default};
