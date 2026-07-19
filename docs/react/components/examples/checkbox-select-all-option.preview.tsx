// #region example
import { useState } from 'react';
import { CheckboxSelect, type CheckboxSelectValue } from '@verbb/plugin-kit-react/components';

const formOptions = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

export function CheckboxSelectAllOptionExample() {
    const [value, setValue] = useState<CheckboxSelectValue>([]);

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

import { stackStyle, valuePreviewStackStyle, valuePreviewStyle } from './exampleStyles';
import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

function ValuePreview({ value }: { value: CheckboxSelectValue }) {
    return (
        <div style={valuePreviewStyle}>
            <strong>Value:</strong> {JSON.stringify(value)}
        </div>
    );
}

function CheckboxSelectAllOptionPreview() {
    const [value, setValue] = useState<CheckboxSelectValue>([]);

    return (
        <div style={valuePreviewStackStyle}>
            <CheckboxSelect
                options={formOptions}
                value={value}
                onChange={setValue}
                showAllOption
                allLabel="All forms"
            />
            <ValuePreview value={value} />
        </div>
    );
}

const preview: PreviewSourceDefinition = {
    label: 'All Option',
    title: 'All option example',
    language: 'tsx',
    source: true,
    render: () => (
        <div style={stackStyle}>
            <CheckboxSelectAllOptionPreview />
        </div>
    ),
};

export default preview;
