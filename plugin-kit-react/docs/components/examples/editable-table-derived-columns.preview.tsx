// #region example
import { useState } from 'react';
import { EditableTable } from '@verbb/plugin-kit-react/components';

export function EditableTableDerivedColumnsExample() {
    const columns = [
        { name: 'label', label: 'Label', type: 'text', required: true },
        {
            name: 'handle',
            label: 'Handle',
            type: 'handle',
            source: 'label',
            placeholder: 'Auto from label',
        },
        {
            name: 'value',
            label: 'Value (exact copy)',
            type: 'value',
            source: 'label',
            placeholder: 'Auto from label',
        },
    ];

    const [rows, setRows] = useState([
        { label: '', handle: '', value: '' },
        { label: 'My First Row', handle: '', value: '' },
        { label: 'Another Option', handle: 'anotherOption', value: 'Another Option' },
    ]);

    return (
        <EditableTable
            columns={columns}
            rows={rows}
            onChange={setRows}
            addRowLabel="Add row"
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Derived Columns',
    title: 'Derived columns example',
    language: 'tsx',
    source: true,
    render: () => <EditableTableDerivedColumnsExample />,
};

export default preview;
