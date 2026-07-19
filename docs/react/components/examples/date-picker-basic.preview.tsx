// #region example
import { useState } from 'react';
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerBasicExample() {
    const [value, setValue] = useState('2026-05-20');

    return (
        <DatePicker
            value={value}
            placeholder="Pick a date"
            onChange={(event) => {
                setValue((event.target as HTMLInputElement).value);
            }}
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Basic Usage',
    title: 'Basic usage example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <DatePickerBasicExample />
        </div>
    ),
};

export default preview;
