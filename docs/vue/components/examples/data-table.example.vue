<script setup lang="ts">
import { ref } from 'vue';
import {
    DataTable,
    type DataTableAction,
    type DataTableColumn,
    type DataTableRow,
} from '@verbb/plugin-kit-vue/components';
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
const columns: DataTableColumn[] = [
    {
        id: 'name',
        label: 'Participant',
        type: 'custom',
        sortable: true,
        hideable: false,
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
const message = ref('Choose a row action to see its event.');
function rowActions(): DataTableAction[] {
    return [
        { id: 'edit', preset: 'edit' },
        { id: 'delete', preset: 'delete' },
        { id: 'review', label: 'Review request' },
    ];
}
function onRowAction(event: CustomEvent<{ action: string; row: DataTableRow }>) {
    const { action, row } = event.detail;
    message.value = `Action “${action}” requested for ${row.name}.`;
}
</script>

<template>
    <DataTable label="Membership requests" :rows="rows" :columns="columns" row-label="name"
        :row-actions="rowActions" @pk-row-action="onRowAction">
        <template #cell-name="{ row }">
            <strong>{{ row.name }}</strong
            ><br /><small>{{ row.email }}</small>
        </template>
    </DataTable>
    <output aria-live="polite">{{ message }}</output>
</template>
