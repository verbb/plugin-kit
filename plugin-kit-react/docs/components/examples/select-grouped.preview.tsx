// #region example
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
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

const vegetableItems = [
    { label: 'Carrot', value: 'carrot' },
    { label: 'Broccoli', value: 'broccoli' },
    { label: 'Spinach', value: 'spinach' },
];

function renderItems(items: typeof fruitItems) {
    return items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
            {item.label}
        </SelectItem>
    ));
}

export function SelectGroupedExample() {
    return (
        <Select items={[...fruitItems, ...vegetableItems]}>
            <SelectTrigger>
                <SelectValue placeholder="Select produce" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {renderItems(fruitItems)}
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>Vegetables</SelectLabel>
                    {renderItems(vegetableItems)}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
