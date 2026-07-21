import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerMultipleExample() {
    // `multiple` mode stores a comma-separated, sorted list of ISO dates.
    const [value, setValue] = useState('2026-05-04,2026-05-20');

    return (
        <DatePicker
            multiple
            label="Availability"
            placeholder="Select dates"
            value={value}
            onChange={(event) => { setValue((event.target as { value: string }).value); }}
        />
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Multiple',
    title: 'Multiple example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <DatePickerMultipleExample />
        </div>
    ),
};

export default preview;
