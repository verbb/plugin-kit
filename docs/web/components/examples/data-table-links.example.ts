import '@verbb/plugin-kit-web/components/data-table.js';
import type { PkDataTable } from '@verbb/plugin-kit-web/components/data-table.js';

export function mountExample(root: HTMLElement): void {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    table.label = 'Member directory';
    table.searchable = false;
    table.columns = [
        {
            id: 'name',
            label: 'Member',
            type: 'link',
            sortable: true,
            href: (row) => `https://example.com/members/${row.id}`,
        },
        { id: 'team', label: 'Team', type: 'text', sortable: true },
        {
            id: 'email',
            label: 'Email',
            type: 'link',
            href: (row) => `mailto:${row.email}`,
        },
        {
            id: 'status',
            label: 'Status',
            type: 'status',
            sortable: true,
            status: (row) =>
                row.status === 'Approved'
                    ? 'active'
                    : row.status === 'Awaiting review'
                      ? 'pending'
                      : 'inactive',
        },
    ];
    table.rows = [
        {
            id: 1,
            name: 'Alex Morgan',
            team: 'Support',
            email: 'alex@example.com',
            status: 'Approved',
        },
        {
            id: 2,
            name: 'Jamie Ellis',
            team: 'Design',
            email: 'jamie@example.com',
            status: 'Awaiting review',
        },
        {
            id: 3,
            name: 'Taylor Chen',
            team: 'Engineering',
            email: 'taylor@example.com',
            status: 'Inactive',
        },
    ];
}
