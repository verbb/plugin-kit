const e=`import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';

const variableCategoryLabels = {
    fieldsWithSelectors: 'Fields',
    form: 'Form',
    general: 'General',
    site: 'Site',
};

const variableCategoryOrder = ['fieldsWithSelectors', 'form', 'general', 'site'];

const variableCategories = {
    fieldsWithSelectors: [
        {
            label: 'Name Field',
            children: [
                { label: 'Full Name', value: '{field:contactName:__toString}', group: 'selector' },
                { label: 'First Name', value: '{field:contactName:firstName}', group: 'selector' },
                { label: 'Last Name', value: '{field:contactName:lastName}', group: 'selector' },
            ],
        },
        {
            label: 'Address Field',
            children: [
                { label: 'Address', value: '{field:address:__toString}', group: 'selector' },
                { label: 'City', value: '{field:address:city}', group: 'selector' },
                { label: 'ZIP / Postal Code', value: '{field:address:zip}', group: 'selector' },
            ],
        },
        {
            label: 'Dropdown Field',
            children: [
                { label: 'Dropdown Label', value: '{field:dropdown:label}', group: 'selector' },
                { label: 'Dropdown Value', value: '{field:dropdown:value}', group: 'selector' },
            ],
        },
    ],
    form: [
        { label: 'Form Name', value: '{form:name}' },
    ],
    general: [
        { label: 'Current Date', value: '{timestamp:dateUs}' },
    ],
    site: [
        { label: 'Current User Email', value: '{user:email}' },
    ],
};

export function TiptapInputSelectorFieldsExample() {
    const [value, setValue] = useState('Contact: {field:contactName} at {field:address:city}');

    return (
        <div style={{ maxWidth: 720 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155' }}>Notification</label>
                <TiptapInput
                    value={value}
                    onChange={setValue}
                    variableCategories={variableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={variableCategoryOrder}
                    placeholder="Use + or @ to pick; click parents for child selectors"
                />
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Selector Fields',
    title: 'Selector fields example',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputSelectorFieldsExample />,
};

export default preview;
`;export{e as default};
