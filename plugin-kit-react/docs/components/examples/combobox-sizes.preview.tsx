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

const comboboxSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
];

export function ComboboxSizesExample() {
    return (
        <div className="space-y-3">
            {comboboxSizes.map(({ label, size }) => (
                <div key={size} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-slate-500">{label}</div>
                    <Combobox
                        items={fruitItems}
                        size={size}
                        defaultValue={fruitItems[0]}
                        itemToStringLabel={(item) => item.label}
                        itemToStringValue={(item) => item.value}
                    >
                        <ComboboxPrimitiveInput placeholder="Select a fruit" />
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
                    </Combobox>
                </div>
            ))}
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={{ ...stackStyle, maxWidth: 'none' }}>
            <ComboboxSizesExample />
        </div>
    ),
};

export default preview;
