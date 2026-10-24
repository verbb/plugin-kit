import { html } from 'lit';
import {
    PkDataTable,
    defaultDataTableQuery,
    queryDataTable,
    type DataTableExportDetail,
    type DataTableColumn,
    type DataTableFilter,
    type DataTableRow,
} from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';

export const records: DataTableRow[] = Array.from(
    { length: 68 },
    (_, index) => ({
        id: index + 1,
        name: [
            'Alex Morgan',
            'Jamie Ellis',
            'Taylor Chen',
            'Sam Rivera',
            'Casey Wright',
            'Jordan Lee',
        ][index % 6],
        email: `member${index + 1}@example.com`,
        status: ['pending', 'active', 'inactive'][index % 3],
        created: new Date(Date.UTC(2026, 9, 23 - (index % 20))).toISOString(),
        requests: index * 3 + 1,
    }),
);
export const columns: DataTableColumn[] = [
    { id: 'name', label: 'Participant', sortable: true, hideable: false },
    { id: 'status', label: 'Status', type: 'status', sortable: true },
    {
        id: 'created',
        label: 'Created',
        type: 'date',
        sortable: true,
        dateOptions: { day: 'numeric', month: 'short', year: 'numeric' },
    },
    { id: 'requests', label: 'Requests', type: 'number', sortable: true },
];
export const filters: DataTableFilter[] = [
    {
        id: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'pending', label: 'Pending' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
        ],
    },
    { id: 'created', label: 'Created', type: 'date-range' },
    { id: 'requests', label: 'Requests', type: 'number-range' },
];

/** The delay simulates a server; production loaders query the full dataset at an endpoint. */
export function mountDataTableExample(
    root: HTMLElement,
    variant = 'records',
): void {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    table.label = 'Membership requests';
    table.columns = columns;
    table.rows = records;
    table.filters = filters;
    table.locale = 'en-AU';
    table.rowLabel = 'name';
    table.query = { ...defaultDataTableQuery(), pageSize: 5 };
    if (variant === 'products') {
        table.label = 'Product demand';
        table.filters = [
            {
                id: 'status',
                label: 'Availability',
                type: 'select',
                options: [
                    { value: 'In stock', label: 'In stock' },
                    { value: 'Out of stock', label: 'Out of stock' },
                ],
            },
        ];
        table.columns = [
            { id: 'name', label: 'Product', sortable: true, hideable: false },
            { id: 'sku', label: 'SKU' },
            {
                id: 'status',
                label: 'Availability',
                type: 'status',
                sortable: true,
                status: (row) =>
                    row.status === 'In stock' ? 'active' : 'inactive',
            },
            {
                id: 'subscribers',
                label: 'Subscribers',
                type: 'number',
                sortable: true,
            },
            { id: 'updated', label: 'Updated', type: 'date', sortable: true },
        ];
        table.rows = Array.from({ length: 18 }, (_, index) => ({
            id: index + 1,
            name: [
                'Canvas tote',
                'Ceramic mug',
                'Linen apron',
                'Desk organiser',
                'Travel flask',
                'Wool throw',
            ][index % 6],
            sku: `SKU-${1000 + index}`,
            status: index % 3 ? 'Out of stock' : 'In stock',
            subscribers: 140 - index * 7,
            updated: new Date(Date.UTC(2026, 9, 23 - index)).toISOString(),
        }));
        table.query = {
            ...table.query,
            sort: [{ id: 'subscribers', direction: 'desc' }],
        };
        table.defaultSort = table.query.sort;
    }
    if (
        variant === 'records' ||
        variant === 'products' ||
        variant === 'actions' ||
        variant === 'index'
    ) {
        table.exportFormats = [
            { value: 'csv', label: 'CSV' },
            { value: 'json', label: 'JSON' },
        ];
        table.addEventListener('pk-export', (event) => {
            const { format, columnIds, query } = (
                event as CustomEvent<DataTableExportDetail>
            ).detail;
            const output = root.querySelector('output');
            if (output)
                output.textContent = `${format.toUpperCase()} export requested with ${columnIds.length} visible columns${query.search ? `, matching “${query.search}”` : ''}. Connect pk-export to your export handler.`;
        });
    }
    if (variant === 'activity') {
        table.label = 'Delivery activity';
        table.filters = [];
        table.columns = [
            { id: 'event', label: 'Event', sortable: true, hideable: false },
            { id: 'recipient', label: 'Recipient', sortable: true },
            {
                id: 'status',
                label: 'Status',
                type: 'status',
                status: (row) =>
                    row.status === 'Delivered' ? 'active' : 'pending',
            },
            {
                id: 'created',
                label: 'Date Created',
                type: 'date',
                sortable: true,
                dateOptions: { dateStyle: 'medium', timeStyle: 'short' },
            },
        ];
        table.rows = records.slice(0, 14).map((row, index) => ({
            id: row.id,
            event: index % 2 ? 'Request accepted' : 'Invitation sent',
            recipient: row.email,
            status: index % 3 ? 'Delivered' : 'Queued',
            created: row.created,
        }));
        table.query = {
            ...table.query,
            sort: [{ id: 'created', direction: 'desc' }],
        };
        table.defaultSort = table.query.sort;
    }
    if (variant === 'custom') {
        table.columns = columns.map((column) =>
            column.id !== 'name'
                ? column
                : {
                      ...column,
                      type: 'custom',
                      renderCell: ({ row }) =>
                          html`<div>
                              <strong>${row.name}</strong>
                              <div
                                  style="font-size:12px;color:var(--pk-data-table-cell-muted-color, var(--pk-color-gray-500))"
                              >
                                  ${row.email}
                              </div>
                          </div>`,
                  },
        );
    }
    if (variant === 'actions' || variant === 'index') {
        table.selectable = true;
        table.query = {
            ...table.query,
            sort: [{ id: 'requests', direction: 'desc' }],
        };
        table.defaultSort = table.query.sort;
        const review = document.createElement('pk-button');
        review.slot = 'selection-actions';
        review.textContent = 'Review selected';
        review.setAttribute('size', 'sm');
        review.setAttribute('variant', 'secondary');
        review.addEventListener('click', () => {
            const output = root.querySelector('output');
            if (output)
                output.textContent = `Review requested for ${table.selectedKeys.length} selected records.`;
        });
        table.append(review);

        table.rowActions = () => variant === 'actions' ? [
            { id: 'edit', preset: 'edit' },
            { id: 'delete', preset: 'delete' },
            { id: 'review', label: 'Review request' },
        ] : [{ id: 'review', label: 'Review request' }];
        if (variant === 'actions') {
            table.columns = [columns[0], {
                id: 'handle', label: 'Handle', type: 'handle',
                value: (row) => `member${row.id}`,
            }, ...columns.slice(1)];
        }
        table.addEventListener('pk-row-action', (event) => {
            const { action, row } = (event as CustomEvent<{ action: string; row: DataTableRow }>)
                .detail;
            const output = root.querySelector('output');
            if (output)
                output.textContent = `Action “${action}” requested for ${row.name}.`;
        });
    }
    if (variant === 'index') {
        table.layout = 'index';
        table.label = 'Member directory';
        table.columns = [
            {
                ...columns[0],
                type: 'link',
                href: (row) => `https://example.com/members/${row.id}`,
                width: '220px',
            },
            {
                id: 'email',
                label: 'Email',
                type: 'link',
                href: (row) => `mailto:${row.email}`,
                width: '240px',
            },
            ...columns
                .slice(1)
                .map((column) => ({ ...column, width: '180px' })),
        ];
        table.query = { ...table.query, pageSize: 25 };
    }
    if (variant === 'compact') {
        table.size = 'compact';
        table.label = 'Notification settings';
        table.filters = [];
        table.rows = records.slice(0, 8);
    }
    if (variant === 'empty') table.rows = [];
    if (variant === 'error') {
        table.mode = 'remote';
        table.error = 'The service is unavailable. Try again.';
        table.rows = [];
    }
    if (variant === 'remote' || variant === 'cursor') {
        table.mode = 'remote';
        if (variant === 'cursor') table.pagination = 'cursor';
        table.dataSource = async (query, { signal }) => {
            await new Promise<void>((resolve, reject) => {
                const abort = () => {
                    clearTimeout(timer);
                    reject(new DOMException('Aborted', 'AbortError'));
                };
                const timer = setTimeout(() => {
                    signal.removeEventListener('abort', abort);
                    resolve();
                }, 450);
                signal.addEventListener('abort', abort, { once: true });
            });
            const index =
                variant === 'cursor'
                    ? Number(query.cursor ?? 0)
                    : query.pageIndex;
            const result = queryDataTable(records, columns, filters, {
                ...query,
                pageIndex: index,
            });
            if (variant !== 'cursor') return result;
            return {
                rows: result.rows,
                nextCursor: result.hasNext ? String(index + 1) : undefined,
                previousCursor: index > 0 ? String(index - 1) : undefined,
            };
        };
    }
}
