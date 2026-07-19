<script setup lang="ts">
import { ref } from 'vue';
import { EditableTable } from '@verbb/plugin-kit-vue/components';

const columns = [
    { name: 'label', label: 'Label', type: 'text', required: true },
    { name: 'handle', label: 'Handle', type: 'handle', source: 'label', placeholder: 'Auto from label' },
    { name: 'value', label: 'Value (exact copy)', type: 'value', source: 'label', placeholder: 'Auto from label' },
];

const rows = ref([
    { label: '', handle: '', value: '' },
    { label: 'My First Row', handle: '', value: '' },
    { label: 'Another Option', handle: 'anotherOption', value: 'Another Option' },
]);

function onChange(event: CustomEvent<{ rows: typeof rows.value }>) {
    rows.value = event.detail.rows;
}
</script>

<template>
    <EditableTable
        :columns="columns"
        :rows="rows"
        add-row-label="Add row"
        @pk-change="onChange"
    />
</template>
