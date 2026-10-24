// #region example
import { useState } from 'react';
import {
    DataTable,
    type DataTableAction,
    type DataTableRow,
    type DataTableReactColumn,
} from '@verbb/plugin-kit-react/components';

const rows = [
    {
        id: 1,
        name: 'Alex Morgan',
        email: 'alex@example.com',
        handle: 'alexMorgan',
        status: 'pending',
    },
    {
        id: 2,
        name: 'Jamie Ellis',
        email: 'jamie@example.com',
        handle: 'jamieEllis',
        status: 'active',
    },
];
const columns: DataTableReactColumn[] = [
    {
        id: 'name',
        label: 'Participant',
        type: 'custom',
        sortable: true,
        hideable: false,
        renderCell: ({ row }) => (
            <span>
                <strong>{String(row.name)}</strong>
                <br />
                <small>{String(row.email)}</small>
            </span>
        ),
    },
    {
        id: 'email',
        label: 'Email',
        type: 'link',
        href: (row) => `mailto:${row.email}`,
    },
    { id: 'handle', label: 'Handle', type: 'handle' },
    { id: 'status', label: 'Status', type: 'status' },
];
export function DataTableExample() {
    const [message, setMessage] = useState('Choose a row action to see its event.');
    function rowActions(): DataTableAction[] {
        return [
            { id: 'edit', preset: 'edit' },
            { id: 'delete', preset: 'delete' },
            { id: 'review', label: 'Review request' },
        ];
    }
    function onRowAction(event: Event) {
        const { action, row } = (event as CustomEvent<{ action: string; row: DataTableRow }>).detail;
        setMessage(`Action “${action}” requested for ${row.name}.`);
    }
    return (
        <>
            <DataTable label="Membership requests" rows={rows} columns={columns} rowLabel="name"
                rowActions={rowActions} onPkRowAction={onRowAction} />
            <output aria-live="polite">{message}</output>
        </>
    );
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';
const preview: PreviewSourceDefinition = {
    label: 'Custom Cells',
    title: 'React data table',
    language: 'tsx',
    source: true,
    render: () => <DataTableExample />,
};
export default preview;
