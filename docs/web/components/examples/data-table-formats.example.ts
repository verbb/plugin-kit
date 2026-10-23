import '@verbb/plugin-kit-web/components/data-table.js';
import type { PkDataTable } from '@verbb/plugin-kit-web/components/data-table.js';

export function mountExample(root: HTMLElement): void {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    table.label = 'Campaign performance';
    table.searchable = false;
    table.locale = 'en-AU';
    table.timeZone = 'Australia/Melbourne';
    table.columns = [
        { id: 'name', label: 'Campaign', type: 'text', sortable: true },
        { id: 'orders', label: 'Orders', type: 'number', sortable: true },
        {
            id: 'revenue',
            label: 'Revenue',
            type: 'number',
            sortable: true,
            numberOptions: { style: 'currency', currency: 'AUD' },
        },
        {
            id: 'conversion',
            label: 'Conversion',
            type: 'number',
            sortable: true,
            value: (row) => Number(row.orders) / Number(row.visits),
            numberOptions: { style: 'percent', maximumFractionDigits: 1 },
        },
        {
            id: 'updated',
            label: 'Updated',
            type: 'date',
            sortable: true,
            dateOptions: { day: 'numeric', month: 'short', year: 'numeric' },
        },
    ];
    table.rows = [
        {
            id: 1,
            name: 'Spring launch',
            orders: 1240,
            visits: 15500,
            revenue: 48250.5,
            updated: '2026-10-22T23:30:00Z',
        },
        {
            id: 2,
            name: 'Member offers',
            orders: 386,
            visits: 8500,
            revenue: 12345.9,
            updated: '2026-10-20T03:00:00Z',
        },
        {
            id: 3,
            name: 'Welcome series',
            orders: 0,
            visits: 320,
            revenue: 0,
            updated: null,
        },
    ];
}
