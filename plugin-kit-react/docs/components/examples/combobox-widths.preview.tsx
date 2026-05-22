// #region example
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxPrimitiveInput,
} from '@verbb/plugin-kit-react/components';

const fruitItems = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
];

function renderContent() {
    return (
        <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
                {(item) => (
                    <ComboboxItem key={item.value} value={item}>
                        {item.label}
                    </ComboboxItem>
                )}
            </ComboboxList>
        </ComboboxContent>
    );
}

export function ComboboxWidthsExample() {
    return (
        <div className="space-y-4">
            <Combobox
                items={fruitItems}
                defaultValue={fruitItems[0]}
                itemToStringLabel={(item) => item.label}
                itemToStringValue={(item) => item.value}
            >
                <ComboboxPrimitiveInput className="w-[220px]" placeholder="Fixed width" />
                {renderContent()}
            </Combobox>

            <div className="w-full max-w-sm">
                <Combobox
                    items={fruitItems}
                    defaultValue={fruitItems[1]}
                    itemToStringLabel={(item) => item.label}
                    itemToStringValue={(item) => item.value}
                >
                    <ComboboxPrimitiveInput className="w-full" placeholder="Full width" />
                    {renderContent()}
                </Combobox>
            </div>
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Widths',
    title: 'Widths example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <ComboboxWidthsExample />
        </div>
    ),
};

export default preview;
