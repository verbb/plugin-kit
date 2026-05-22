// #region example
import { useState } from 'react';
import { CheckboxSelect, type CheckboxSelectValue } from '@verbb/plugin-kit-react/components';

const fruitOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
];

export function CheckboxSelectSelectedValuesExample() {
    const [value, setValue] = useState<CheckboxSelectValue>(['apple', 'grapes']);

    return (
        <div className="text-sm">
            <h3 className="mb-2 text-sm font-bold">Select fruits</h3>
            <CheckboxSelect
                options={fruitOptions}
                value={value}
                onChange={setValue}
                showAllOption={false}
            />
        </div>
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

function ValuePreview({ value }: { value: CheckboxSelectValue }) {
    return (
        <div className="rounded bg-slate-100 p-3 text-xs font-mono">
            <strong>Value:</strong> {JSON.stringify(value)}
        </div>
    );
}

function CheckboxSelectSelectedValuesPreview() {
    const [value, setValue] = useState<CheckboxSelectValue>(['apple', 'grapes']);

    return (
        <div className="space-y-4 text-sm">
            <div>
                <h3 className="mb-2 text-sm font-bold">Select fruits</h3>
                <CheckboxSelect
                    options={fruitOptions}
                    value={value}
                    onChange={setValue}
                    showAllOption={false}
                />
            </div>
            <ValuePreview value={value} />
        </div>
    );
}

const preview: PreviewSourceDefinition = {
    label: 'Selected Values',
    title: 'Selected values example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectSelectedValuesPreview />
        </div>
    ),
};

export default preview;
