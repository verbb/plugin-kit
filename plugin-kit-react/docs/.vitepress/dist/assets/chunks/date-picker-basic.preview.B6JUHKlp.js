const e=`// #region example
import { useState } from 'react';
import { DatePicker } from '@verbb/plugin-kit-react/components';

export function DatePickerBasicExample() {
    const [value, setValue] = useState<Date | null>(new Date());

    return (
        <DatePicker
            value={value ? value.toISOString() : ''}
            onValueChange={setValue}
            placeholder="Pick a date"
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

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
`;export{e as default};
