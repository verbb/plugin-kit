const e=`// #region example
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@verbb/plugin-kit-react/components';

const fruitItems = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
];

const selectSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
];

function renderItems() {
    return fruitItems.map((item) => (
        <SelectItem key={item.value} value={item.value}>
            {item.label}
        </SelectItem>
    ));
}

export function SelectSizesExample() {
    return (
        <div className="space-y-3">
            {selectSizes.map(({ label, size }) => (
                <div key={size} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-slate-500">{label}</div>
                    <Select items={fruitItems} defaultValue="apple" size={size}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {renderItems()}
                        </SelectContent>
                    </Select>
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
            <SelectSizesExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
