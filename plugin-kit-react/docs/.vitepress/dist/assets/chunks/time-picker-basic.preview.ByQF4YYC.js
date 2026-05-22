const e=`// #region example
import { useState } from 'react';
import { TimePicker } from '@verbb/plugin-kit-react/components';

export function TimePickerBasicExample() {
    const [value, setValue] = useState('09:00');

    return (
        <TimePicker
            value={value}
            onValueChange={setValue}
            placeholder="Select time"
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
            <TimePickerBasicExample />
        </div>
    ),
};

export default preview;
`;export{e as default};
