// #region example
import { useState } from 'react';
import { ALL_VALUE, CheckboxSelect, type CheckboxSelectValue } from '@verbb/plugin-kit-react/components';

const formOptions = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

export function CheckboxSelectAllSelectedExample() {
    const [value, setValue] = useState<CheckboxSelectValue>(ALL_VALUE);

    return (
        <CheckboxSelect
            options={formOptions}
            value={value}
            onChange={setValue}
            showAllOption
            allLabel="All forms"
        />
    );
}
// #endregion example

import { stackStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'All Selected',
    title: 'All selected example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectAllSelectedExample />
        </div>
    ),
};

export default preview;
