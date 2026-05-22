import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

// #region example
import { useState } from 'react';
import { TiptapInput } from '@verbb/plugin-kit-react/components';

const variableCategoryLabels = {
    emailFields: 'Fields',
    general: 'General',
    site: 'Site',
};

const toAddressVariableCategoryOrder = ['emailFields', 'general', 'site'];
const replyToVariableCategoryOrder = ['emailFields'];

const toAddressVariableCategories = {
    emailFields: [
        { label: 'Email Field', value: '{field:email}' },
        { label: 'Recipients Field', value: '{field:recipients}' },
    ],
    general: [
        { label: 'System Email', value: '{system:email}' },
        { label: 'System Reply-To', value: '{system:replyTo}' },
    ],
    site: [
        { label: 'Current User Email', value: '{user:email}' },
    ],
};

const replyToVariableCategories = {
    emailFields: [
        { label: 'Email Field', value: '{field:email}' },
        { label: 'Hidden Email', value: '{field:hiddenEmail}' },
    ],
};

export function TiptapInputEmailVariablesExample() {
    const [toAddress, setToAddress] = useState('{user:email}');
    const [replyToAddress, setReplyToAddress] = useState('{field:email}');

    return (
        <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155' }}>To</label>
                <TiptapInput
                    value={toAddress}
                    onChange={setToAddress}
                    variableCategories={toAddressVariableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={toAddressVariableCategoryOrder}
                    placeholder="Insert email variable"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#334155' }}>Reply-To</label>
                <TiptapInput
                    value={replyToAddress}
                    onChange={setReplyToAddress}
                    variableCategories={replyToVariableCategories}
                    variableCategoryLabels={variableCategoryLabels}
                    variableCategoryOrder={replyToVariableCategoryOrder}
                    placeholder="Insert email field variable"
                />
            </div>
        </div>
    );
}
// #endregion example

const preview: PreviewSourceDefinition = {
    label: 'Email Variables',
    title: 'Email variables example',
    language: 'tsx',
    source: true,
    render: () => <TiptapInputEmailVariablesExample />,
};

export default preview;
