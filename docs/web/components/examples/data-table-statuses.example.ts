import '@verbb/plugin-kit-web/components/data-table.js';
import type { PkDataTable } from '@verbb/plugin-kit-web/components/data-table.js';

export function mountExample(root: HTMLElement): void {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    table.label = 'Order statuses';
    table.searchable = false;
    table.selectable = true;
    table.columns = [
        { id: 'reference', label: 'Order', sortable: true },
        {
            id: 'workflow',
            label: 'Workflow',
            type: 'status',
            status: (row) =>
                row.workflow === 'Processing'
                    ? 'pending'
                    : row.workflow === 'Packed'
                      ? 'blue'
                      : row.workflow === 'Shipped'
                        ? 'active'
                        : 'purple',
        },
        {
            id: 'payment',
            label: 'Payment',
            type: 'status',
            status: (row) =>
                row.payment === 'Paid'
                    ? 'green'
                    : row.payment === 'Partial'
                      ? 'orange'
                      : row.payment === 'Unpaid'
                        ? 'red'
                        : 'gray',
        },
    ];
    table.rows = [
        { id: 1, reference: '#1001', workflow: 'Processing', payment: 'Paid' },
        { id: 2, reference: '#1002', workflow: 'Packed', payment: 'Partial' },
        { id: 3, reference: '#1003', workflow: 'Shipped', payment: 'Paid' },
        { id: 4, reference: '#1004', workflow: 'On hold', payment: 'Unpaid' },
        { id: 5, reference: '#1005', workflow: 'On hold', payment: 'Refunded' },
    ];
}
