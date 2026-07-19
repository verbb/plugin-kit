// #region example
import { useState } from 'react';
import { EditableTable } from '@verbb/plugin-kit-react/components';

export function EditableTableCompactSelectionExample() {
    const thinColumns = [
        { name: 'label', label: 'Option Label', type: 'text', required: true },
        { name: 'value', label: 'Value', type: 'text' },
        { name: 'isDefault', label: 'Default', type: 'checkbox', thin: true },
        { name: 'isDisabled', label: 'Disabled', type: 'checkbox', thin: true },
    ];
    const radioColumns = [
        { name: 'label', label: 'Option Label', type: 'text', required: true },
        { name: 'value', label: 'Value', type: 'text' },
        { name: 'isDefault', label: 'Default (allow unselect)', type: 'radio', allowUnselect: true },
        { name: 'isDisabled', label: 'Disabled', type: 'checkbox' },
    ];

    const [thinRows, setThinRows] = useState([
        { label: 'Some Text', value: 'Some Text', isDefault: false, isDisabled: false },
        { label: 'More Text', value: 'More Text', isDefault: false, isDisabled: false },
    ]);
    const [radioRows, setRadioRows] = useState([
        { label: 'Select an option', value: 'Select an option', isDefault: true, isDisabled: true },
        { label: 'Option 1', value: 'Option 1', isDefault: false, isDisabled: true },
        { label: 'Option 2', value: 'Option 2', isDefault: false, isDisabled: true },
    ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <EditableTable columns={thinColumns} rows={thinRows} onChange={setThinRows} addRowLabel="Add an option" />
            <EditableTable columns={radioColumns} rows={radioRows} onChange={setRadioRows} addRowLabel="Add an option" />
        </div>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Compact Selection Columns',
    title: 'Compact selection columns example',
    language: 'tsx',
    source: true,
    render: () => <EditableTableCompactSelectionExample />,
};

export default preview;
