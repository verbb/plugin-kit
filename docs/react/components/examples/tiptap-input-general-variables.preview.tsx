import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';

const variableCategoryLabels = {
    form: 'Form',
    general: 'General',
    site: 'Site',
};

const variableCategoryOrder = ['form', 'general', 'site'];

const variableCategories = {
    form: [
        { label: 'Form Name', value: '{form:name}' },
        { label: 'Form Handle', value: '{form:handle}' },
    ],
    general: [
        { label: 'Current Date', value: '{timestamp:dateUs}' },
        { label: 'Current Time', value: '{timestamp:time12}' },
    ],
    site: [
        { label: 'Current User Email', value: '{user:email}' },
        { label: 'Current User Full Name', value: '{user:fullName}' },
    ],
};

export function TiptapInputGeneralVariablesExample() {
    const [value, setValue] = useState('Hi {user:fullName}, your form {form:name} was submitted on {timestamp:dateUs}.');

    return (
        <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155' }}>Notification subject</label>
                <TiptapInput
                    value={value}
                    onChange={setValue}
                    variableCategories={variableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={variableCategoryOrder}
                    placeholder="Type or use + / @ for variables"
                />
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'General Variables',
    title: 'General variables example',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputGeneralVariablesExample />,
};

export default preview;
