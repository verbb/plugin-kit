// #region example
import {
    DataTable,
    type DataTableReactColumn,
} from '@verbb/plugin-kit-react/components';

const rows = [
    {
        id: 1,
        name: 'Alex Morgan',
        email: 'alex@example.com',
        status: 'pending',
    },
    {
        id: 2,
        name: 'Jamie Ellis',
        email: 'jamie@example.com',
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
    { id: 'status', label: 'Status', type: 'status' },
];
export function DataTableExample() {
    return (
        <DataTable label="Membership requests" rows={rows} columns={columns} />
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
