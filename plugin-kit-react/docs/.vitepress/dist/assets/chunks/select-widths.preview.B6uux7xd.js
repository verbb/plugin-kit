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

function renderItems() {
    return fruitItems.map((item) => (
        <SelectItem key={item.value} value={item.value}>
            {item.label}
        </SelectItem>
    ));
}

export function SelectWidthsExample() {
    return (
        <div className="space-y-4">
            <Select items={fruitItems} defaultValue="apple">
                <SelectTrigger className="w-[220px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {renderItems()}
                </SelectContent>
            </Select>

            <div className="w-full max-w-sm">
                <Select items={fruitItems} defaultValue="banana">
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {renderItems()}
                    </SelectContent>
                </Select>
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
            <SelectWidthsExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
