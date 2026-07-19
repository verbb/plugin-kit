<script setup lang="ts">
import { ref } from 'vue';
import { EditableTable } from '@verbb/plugin-kit-vue/components';

const fullColumns = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'heading', label: 'Heading', type: 'heading' },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        width: '140px',
        options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Tertiary', value: 'tertiary' },
        ],
    },
    { name: 'checkbox', label: 'Checkbox', type: 'checkbox', width: '80px' },
    { name: 'lightswitch', label: 'Lightswitch', type: 'lightswitch', width: '110px' },
    { name: 'color', label: 'Color', type: 'color', width: '110px' },
    { name: 'date', label: 'Date', type: 'date', width: '140px' },
    { name: 'time', label: 'Time', type: 'time', width: '120px' },
    { name: 'email', label: 'Email', type: 'email', width: '200px' },
    { name: 'url', label: 'URL', type: 'url', width: '200px' },
    { name: 'number', label: 'Number', type: 'number', width: '110px' },
    { name: 'notes', label: 'Notes', type: 'textarea', width: '220px' },
] as const;

const fullRows = [
    {
        name: 'First Name',
        heading: 'Basic',
        category: 'primary',
        checkbox: true,
        lightswitch: true,
        color: '#8b5cf6',
        date: '2026-01-27',
        time: '09:30',
        email: 'hello@example.com',
        url: 'https://example.com',
        number: 3,
        notes: '',
    },
    {
        name: 'Age',
        heading: 'Details',
        category: 'secondary',
        checkbox: false,
        lightswitch: false,
        color: '#f97316',
        date: '2026-02-14',
        time: '17:15',
        email: 'team@example.com',
        url: 'https://verbb.io',
        number: 42,
        notes: 'Optional',
    },
];

const rows = ref(fullRows);

function onChange(event: CustomEvent<{ rows: typeof rows.value }>) {
    rows.value = event.detail.rows;
}
</script>

<template>
    <EditableTable
        :columns="fullColumns"
        :rows="rows"
        add-row-label="Add row"
        @pk-change="onChange"
    />
</template>
