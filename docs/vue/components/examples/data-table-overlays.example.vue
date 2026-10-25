<script setup lang="ts">
import { ref } from 'vue';
import {
    Button, DataTable, Dialog, Popover,
    type DataTableRow, type DataTableColumn,
} from '@verbb/plugin-kit-vue/components';

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
const columns: DataTableColumn[] = [
    { id: 'name', label: 'Message', sortable: true, hideable: false },
    { id: 'audience', label: 'Audience' },
    { id: 'preview', label: 'Content', type: 'custom' },
    { id: 'delivery', label: 'Delivery', type: 'custom' },
];
const preview = ref<DataTableRow>(rows[0]);
const open = ref(false);
let previewTrigger: HTMLElement | undefined;

function previewEmail(row: DataTableRow, event: Event): void {
    previewTrigger = event.currentTarget as HTMLElement;
    preview.value = row;
    open.value = true;
}

function restorePreviewFocus(): void {
    // Return to the exact cell control, including inside shadow-root hosts.
    if (previewTrigger?.isConnected) previewTrigger.focus({ preventScroll: true });
}
</script>

<template>
    <DataTable label="Email campaigns" row-label="name" :rows="rows" :columns="columns">
        <template #cell-preview="{ row }">
            <Button size="sm" :aria-label="`Preview email: ${row.name}`" aria-haspopup="dialog"
                @click="previewEmail(row, $event)">Preview email</Button>
        </template>
        <template #cell-delivery="{ row }">
            <Popover placement="bottom-end" :label="`Delivery summary: ${row.name}`">
                <Button slot="trigger" size="sm" :aria-label="`Delivery summary: ${row.name}`">
                    Delivery summary
                </Button>
                <div style="min-width:180px;white-space:normal">
                    <strong>{{ row.name }}</strong>
                    <dl style="display:grid;grid-template-columns:1fr auto;gap:8px 24px;margin:12px 0 0">
                        <dt>Delivered</dt><dd style="margin:0">{{ row.delivered }}</dd>
                        <dt>Queued</dt><dd style="margin:0">{{ row.queued }}</dd>
                        <dt>Failed</dt><dd style="margin:0">{{ row.failed }}</dd>
                    </dl>
                </div>
            </Popover>
        </template>
    </DataTable>
    <Dialog :label="`Preview: ${preview.name}`" :open="open"
        @pk-open-change="open = $event.detail.open" @pk-after-hide="restorePreviewFocus">
        <p style="margin-top:0"><strong>To:</strong> {{ preview.recipient }}</p>
        <h3 style="margin:0 0 16px">{{ preview.subject }}</h3>
        <p>{{ preview.message }}</p>
        <p style="font-size:12px">Sample message only. No email is sent.</p>
        <Button slot="footer" data-dialog-close>Done</Button>
    </Dialog>
</template>
