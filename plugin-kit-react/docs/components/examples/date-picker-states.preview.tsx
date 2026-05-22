// #region example
import { useState } from 'react';
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerStatesExample() {
    const [emptyValue, setEmptyValue] = useState<Date | null>(null);
    const [invalidValue, setInvalidValue] = useState<Date | null>(new Date());

    return (
        <div className="flex flex-wrap gap-3">
            <DatePicker
                value={emptyValue ? emptyValue.toISOString() : ''}
                onValueChange={setEmptyValue}
                placeholder="Empty state"
            />
            <DatePicker
                value={invalidValue ? invalidValue.toISOString() : ''}
                onValueChange={setInvalidValue}
                isInvalid
            />
            <DatePicker
                value={new Date().toISOString()}
                disabled
            />
        </div>
    );
}
// #endregion example

import { rowStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'States',
    title: 'Date picker state examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <DatePickerStatesExample />
        </div>
    ),
};

export default preview;
