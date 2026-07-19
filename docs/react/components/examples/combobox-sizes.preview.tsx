// #region example
import { Combobox, Option } from '@verbb/plugin-kit-react/components';

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
];

const comboboxSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
];

export function ComboboxSizesExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {comboboxSizes.map(({ label, size }) => (
                <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 96, fontSize: 12, color: '#64748b' }}>{label}</div>
                    <Combobox
                        size={size === 'default' ? undefined : size}
                        placeholder="Select a fruit"
                        value="apple"
                    >
                        {fruits.map((fruit) => (
                            <Option key={fruit.value} value={fruit.value}>{fruit.label}</Option>
                        ))}
                    </Combobox>
                </div>
            ))}
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Sizes',
    title: 'Sizes example',
    language: 'tsx',
    source: true,
    render: () => <ComboboxSizesExample />,
};

export default preview;
