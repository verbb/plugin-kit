// #region example
import { useState } from 'react';
import { EditableTable } from '@verbb/plugin-kit-react/components';

const fullColumns = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'heading', label: 'Heading', type: 'heading' },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        width: '140px',
        options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
        ],
    },
    { name: 'checkbox', label: 'Checkbox', type: 'checkbox', width: '80px' },
    { name: 'lightswitch', label: 'Lightswitch', type: 'lightswitch', width: '110px' },
    { name: 'color', label: 'Color', type: 'color', width: '110px' },
    { name: 'date', label: 'Date', type: 'date', width: '140px' },
    { name: 'time', label: 'Time', type: 'time', width: '120px' },
    { name: 'email', label: 'Email', type: 'email', width: '200px' },
    { name: 'url', label: 'URL', type: 'url', width: '200px' },
    { name: 'number', label: 'Number', type: 'number', width: '110px' },
    { name: 'notes', label: 'Notes', type: 'textarea', width: '220px' },
] as const;

const fullRows = [
    {
        name: 'First Name',
        heading: 'Basic',
        category: 'primary',
        checkbox: true,
        lightswitch: true,
        color: '#8b5cf6',
        date: '2026-01-27',
        time: '09:30',
        email: 'hello@example.com',
        url: 'https://example.com',
        number: 3,
        notes: '',
    },
    {
        name: 'Age',
        heading: 'Details',
        category: 'secondary',
        checkbox: false,
        lightswitch: false,
        color: '#f97316',
        date: '2026-02-14',
        time: '17:15',
        email: 'team@example.com',
        url: 'https://verbb.io',
        number: 42,
        notes: 'Optional',
    },
];

export function EditableTableMixedFieldTypesExample() {
    const [rows, setRows] = useState(fullRows);

    return (
        <EditableTable
            columns={fullColumns}
            rows={rows}
            onChange={setRows}
            addRowLabel="Add row"
        />
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Mixed Field Types',
    title: 'Mixed field types example',
    language: 'tsx',
    source: true,
    render: () => <EditableTableMixedFieldTypesExample />,
};

export default preview;
