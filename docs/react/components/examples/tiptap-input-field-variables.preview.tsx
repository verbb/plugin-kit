import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';

const variableCategoryLabels = {
    plainTextFields: 'Fields',
};

const variableCategoryOrder = ['plainTextFields'];

const variableCategories = {
    plainTextFields: [
        { label: 'Name', value: '{field:name}' },
        { label: 'Email', value: '{field:email}' },
        { label: 'Message', value: '{field:message}' },
    ],
};

export function TiptapInputFieldVariablesExample() {
    const [value, setValue] = useState('Name: {field:name}, Message: {field:message}');

    return (
        <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155' }}>Calculation / field reference</label>
                <TiptapInput
                    value={value}
                    onChange={setValue}
                    variableCategories={variableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={variableCategoryOrder}
                    placeholder="Insert form field variables"
                />
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Field Variables',
    title: 'Field variables example',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputFieldVariablesExample />,
};

export default preview;
