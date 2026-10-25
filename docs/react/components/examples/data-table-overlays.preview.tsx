// #region example
import { useRef, useState } from 'react';
import {
    Button, DataTable, Dialog, Popover,
    type DataTableRow, type DataTableReactColumn,
} from '@verbb/plugin-kit-react/components';

const rows = [
    {
        id: 1, name: 'Welcome email', audience: 'New members',
        subject: 'Welcome to the club', recipient: 'alex@example.com',
        message: 'Thanks for joining us, Alex. Your membership is ready to use.',
        delivered: 124, queued: 8, failed: 0,
    },
    {
        id: 2, name: 'Cart reminder', audience: 'Recent shoppers',
        subject: 'Your saved items are waiting', recipient: 'jamie@example.com',
        message: 'Hi Jamie, your saved basket is ready whenever you are.',
        delivered: 86, queued: 12, failed: 3,
    },
    {
        id: 3, name: 'Renewal notice', audience: 'Expiring memberships',
        subject: 'Keep your membership active', recipient: 'sam@example.com',
        message: 'Hi Sam, your membership renews next month. Review your details before then.',
        delivered: 42, queued: 6, failed: 1,
    },
];

export function DataTableOverlaysExample() {
    const [preview, setPreview] = useState<DataTableRow>(rows[0]);
    const [open, setOpen] = useState(false);
    const previewTrigger = useRef<HTMLElement | null>(null);
    const columns: DataTableReactColumn[] = [
        { id: 'name', label: 'Message', sortable: true, hideable: false },
        { id: 'audience', label: 'Audience' },
        {
            id: 'preview', label: 'Content', type: 'custom',
            renderCell: ({ row }) => <Button size="sm"
                aria-label={`Preview email: ${row.name}`} aria-haspopup="dialog"
                onClick={(event) => {
                    previewTrigger.current = event.currentTarget;
                    setPreview(row);
                    setOpen(true);
                }}>Preview email</Button>,
        },
        {
            id: 'delivery', label: 'Delivery', type: 'custom',
            renderCell: ({ row }) => <Popover placement="bottom-end"
                label={`Delivery summary: ${row.name}`}>
                <Button slot="trigger" size="sm"
                    aria-label={`Delivery summary: ${row.name}`}>Delivery summary</Button>
                <div style={{ minWidth: 180, whiteSpace: 'normal' }}>
                    <strong>{String(row.name)}</strong>
                    <dl style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px 24px', margin: '12px 0 0' }}>
                        <dt>Delivered</dt><dd style={{ margin: 0 }}>{String(row.delivered)}</dd>
                        <dt>Queued</dt><dd style={{ margin: 0 }}>{String(row.queued)}</dd>
                        <dt>Failed</dt><dd style={{ margin: 0 }}>{String(row.failed)}</dd>
                    </dl>
                </div>
            </Popover>,
        },
    ];

    return <>
        <DataTable label="Email campaigns" rowLabel="name" rows={rows} columns={columns} />
        <Dialog label={`Preview: ${preview.name}`} open={open}
            onPkOpenChange={(event) => setOpen((event as CustomEvent<{ open: boolean }>).detail.open)}
            onPkAfterHide={() => {
                // Return to the exact cell control, including inside shadow-root hosts.
                if (previewTrigger.current?.isConnected) previewTrigger.current.focus({ preventScroll: true });
            }}>
            <p style={{ marginTop: 0 }}><strong>To:</strong> {String(preview.recipient)}</p>
            <h3 style={{ margin: '0 0 16px' }}>{String(preview.subject)}</h3>
            <p>{String(preview.message)}</p>
            <p style={{ fontSize: 12 }}>Sample message only. No email is sent.</p>
            <Button slot="footer" data-dialog-close>Done</Button>
        </Dialog>
    </>;
}
// #endregion example

import type { PreviewSourceDefinition } from '../../../.vitepress/theme/components/codeBlocks';

const preview: PreviewSourceDefinition = {
    label: 'Dialogs and Popovers',
    title: 'Consumer-owned email preview and delivery summary',
    language: 'tsx',
    source: true,
    render: () => <DataTableOverlaysExample />,
};
export default preview;
