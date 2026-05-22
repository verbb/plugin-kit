// #region example
import { useState } from 'react';
import { TimePicker } from '@verbb/plugin-kit-react/components';

export function TimePickerEmptyExample() {
    const [value, setValue] = useState('');

    return (
        <TimePicker
            value={value}
            onValueChange={setValue}
            placeholder="Pick reminder time"
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Empty State',
    title: 'Empty state example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <TimePickerEmptyExample />
        </div>
    ),
};

export default preview;
