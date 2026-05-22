// #region example
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

function renderItems(items = fruitItems) {
    return items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
            {item.label}
        </SelectItem>
    ));
}

export function SelectBasicExample() {
    return (
        <Select items={fruitItems}>
            <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                {renderItems()}
            </SelectContent>
        </Select>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
