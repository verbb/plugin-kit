<script setup lang="ts">
import { ref } from 'vue';
import {
    DataTable,
    Button,
    type DataTableColumn,
} from '@verbb/plugin-kit-vue/components';
const size = ref<'default' | 'compact'>('default');
const rows = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    name: `Member ${String(index + 1).padStart(2, '0')}`,
    email: `member${index + 1}@example.com`,
    status: index % 3 ? 'active' : 'pending',
}));
const columns: DataTableColumn[] = [
    { id: 'name', label: 'Member', sortable: true, width: '240px' },
    {
        id: 'email',
        label: 'Email',
        type: 'link',
        href: (row) => `mailto:${row.email}`,
        width: '320px',
    },
    { id: 'status', label: 'Status', type: 'status', width: '200px' },
];
</script>
<template>
    <div style="max-height: 420px; overflow: auto; padding: 2px">
        <DataTable
            label="Member directory"
            layout="index"
            :size="size"
            selectable
            row-label="name"
            :rows="rows"
            :columns="columns"
        >
            <template #toolbar-controls>
                <div role="group" aria-label="Table density" style="display: flex; gap: 4px">
                    <Button :aria-pressed="size === 'default'" :variant="size === 'default' ? 'secondary' : 'default'" @click="size = 'default'">Comfortable</Button>
                    <Button :aria-pressed="size === 'compact'" :variant="size === 'compact' ? 'secondary' : 'default'" @click="size = 'compact'">Compact</Button>
                </div>
            </template>
        </DataTable>
    </div>
</template>
