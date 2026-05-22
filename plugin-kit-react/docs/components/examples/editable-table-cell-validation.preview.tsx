// #region example
import { useState } from 'react';
import { EditableTable } from '@verbb/plugin-kit-react/components';

export function EditableTableCellValidationExample() {
    const columns = [
        { name: 'name', label: 'Name', type: 'text', required: true, width: '180px' },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            width: '140px',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
            ],
        },
        { name: 'color', label: 'Color', type: 'color', width: '110px' },
        { name: 'date', label: 'Date', type: 'date', width: '140px' },
        { name: 'time', label: 'Time', type: 'time', width: '120px' },
        { name: 'email', label: 'Email', type: 'email', width: '200px' },
        { name: 'notes', label: 'Notes', type: 'textarea', width: '220px' },
    ];

    const [rows, setRows] = useState([
        {
            name: '',
            category: '',
            color: '#a9',
            date: '',
            time: '',
            email: 'not-an-email',
            notes: '',
        },
        {
            name: 'Valid Row',
            category: 'primary',
            color: '#35e533',
            date: '2026-02-14',
            time: '09:30',
            email: 'team@example.com',
            notes: 'No errors on this row.',
        },
    ]);

    const cellErrors = {
        'demoTable.0.name': ['Name is required.'],
        'demoTable.0.category': ['Category is required.'],
        'demoTable.0.color': ['Enter a valid 3 or 6 digit hex color.'],
        'demoTable.0.date': ['Date is required.'],
        'demoTable.0.time': ['Time is required.'],
        'demoTable.0.email': ['Enter a valid email address.'],
        'demoTable.0.notes': ['Notes are required for this example.'],
    };

    return (
        <EditableTable
            columns={columns}
            rows={rows}
            onChange={setRows}
            fieldName="demoTable"
            cellErrors={cellErrors}
            addRowLabel="Add row"
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Cell Validation',
    title: 'Cell validation example',
    language: 'tsx',
    source: true,
    render: () => <EditableTableCellValidationExample />,
};

export default preview;
