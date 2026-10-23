<script setup lang="ts">
import {
    DataTable,
    type DataTableColumn,
} from '@verbb/plugin-kit-vue/components';
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
    { id: 'status', label: 'Status', type: 'status' },
];
</script>

<template>
    <DataTable label="Membership requests" :rows="rows" :columns="columns">
        <template #cell-name="{ row }">
            <strong>{{ row.name }}</strong
            ><br /><small>{{ row.email }}</small>
        </template>
    </DataTable>
</template>
