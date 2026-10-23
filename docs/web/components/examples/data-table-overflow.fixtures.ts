import { PkDataTable } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';

export function mountOverflowExample(root: HTMLElement) {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    table.label = 'Long content and wide tables';
    table.layout = 'index';
    table.columns = [
        {
            id: 'title',
            label: 'Record',
            type: 'link',
            href: (row) => `#record-${row.id}`,
            sortable: true,
            width: '220px',
        },
        { id: 'description', label: 'Delivery notes and instructions', width: '260px' },
        { id: 'reference', label: 'Long reference', width: '180px' },
        { id: 'code', label: 'Keep on one line', wrap: false },
        { id: 'status', label: 'Status', type: 'status' },
        { id: 'requests', label: 'Requests', type: 'number', sortable: true },
        { id: 'region', label: 'Region', wrap: false },
        { id: 'created', label: 'Created', type: 'date' },
    ];
    table.rows = Array.from({ length: 16 }, (_, index) => ({
        id: index + 1,
        title: `Membership request ${index + 1} — a deliberately long linked record title that stays on one line`,
        description:
            'Please send delivery updates to the regional warehouse team. This longer note wraps within the column instead of making the entire page wider.',
        reference: `request_${'0123456789abcdef'.repeat(7)}`,
        code: `MEMBER-2026-NORTH-AMERICA-${String(index + 1).padStart(4, '0')}`,
        status: index % 2 ? 'pending' : 'active',
        requests: 120 + index,
        region: 'North America / East Coast',
        created: '2026-10-23T12:00:00Z',
    }));
}
