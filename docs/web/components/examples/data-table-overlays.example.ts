import { html, render } from 'lit';
import '@verbb/plugin-kit-web/components/data-table.js';
import '@verbb/plugin-kit-web/components/button.js';
import '@verbb/plugin-kit-web/components/dialog.js';
import '@verbb/plugin-kit-web/components/popover.js';
import type { PkDataTable } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';
import type { PkDialog } from '@verbb/plugin-kit-web/components/dialog/pk-dialog.js';
import type { DataTableRow } from '@verbb/plugin-kit-web/components/data-table/pk-data-table.js';

export const overlayHtml = `
<pk-data-table></pk-data-table>
<pk-dialog label="Email preview" style="--pk-dialog-width: 36rem">
    <div data-preview-content></div>
    <pk-button slot="footer" data-dialog-close>Done</pk-button>
</pk-dialog>`;

// Insert overlayHtml into your page, then pass its containing element here.
export function mountOverlayExample(root: HTMLElement): () => void {
    const table = root.querySelector<PkDataTable>('pk-data-table')!;
    const dialog = root.querySelector<PkDialog>('pk-dialog')!;
    const content = root.querySelector<HTMLElement>('[data-preview-content]')!;
    let previewTrigger: HTMLElement | undefined;

    function previewEmail(row: DataTableRow, event: Event): void {
        previewTrigger = event.currentTarget as HTMLElement;
        dialog.label = `Preview: ${row.name}`;
        render(html`
            <p style="margin-top:0"><strong>To:</strong> ${row.recipient}</p>
            <h3 style="margin:0 0 16px">${row.subject}</h3>
            <p>${row.message}</p>
            <p style="font-size:12px">Sample message only. No email is sent.</p>
        `, content);
        dialog.open = true;
    }

    // The custom cell lives inside the table's shadow root; keep its exact trigger.
    function restorePreviewFocus(): void {
        if (previewTrigger?.isConnected) previewTrigger.focus({ preventScroll: true });
    }
    dialog.addEventListener('pk-after-hide', restorePreviewFocus);

    table.label = 'Email campaigns';
    table.rowLabel = 'name';
    table.rows = [
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
    table.columns = [
        { id: 'name', label: 'Message', sortable: true, hideable: false },
        { id: 'audience', label: 'Audience' },
        {
            id: 'preview', label: 'Content', type: 'custom',
            renderCell: ({ row }) => html`<pk-button size="sm"
                aria-label=${`Preview email: ${row.name}`} aria-haspopup="dialog"
                @click=${(event: Event) => previewEmail(row, event)}
                >Preview email</pk-button>`,
        },
        {
            id: 'delivery', label: 'Delivery', type: 'custom',
            renderCell: ({ row }) => html`<pk-popover placement="bottom-end"
                label=${`Delivery summary: ${row.name}`}>
                <pk-button slot="trigger" size="sm"
                    aria-label=${`Delivery summary: ${row.name}`}>Delivery summary</pk-button>
                <div style="min-width:180px;white-space:normal">
                    <strong>${row.name}</strong>
                    <dl style="display:grid;grid-template-columns:1fr auto;gap:8px 24px;margin:12px 0 0">
                        <dt>Delivered</dt><dd style="margin:0">${row.delivered}</dd>
                        <dt>Queued</dt><dd style="margin:0">${row.queued}</dd>
                        <dt>Failed</dt><dd style="margin:0">${row.failed}</dd>
                    </dl>
                </div>
            </pk-popover>`,
        },
    ];

    return () => dialog.removeEventListener('pk-after-hide', restorePreviewFocus);
}
