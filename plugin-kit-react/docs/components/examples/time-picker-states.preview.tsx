// #region example
import { useState } from 'react';
import { TimePicker } from '@verbb/plugin-kit-react/components';

export function TimePickerStatesExample() {
    const [emptyValue, setEmptyValue] = useState('');
    const [invalidValue, setInvalidValue] = useState('16:30');

    return (
        <div className="flex flex-wrap gap-3">
            <TimePicker
                value={emptyValue}
                onValueChange={setEmptyValue}
                placeholder="Select time"
            />
            <TimePicker
                value={invalidValue}
                onValueChange={setInvalidValue}
                isInvalid
            />
            <TimePicker
                value="09:00"
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
    title: 'Time picker state examples',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={rowStyle}>
            <TimePickerStatesExample />
        </div>
    ),
};

export default preview;
