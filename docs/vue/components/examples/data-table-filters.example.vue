<script setup lang="ts">
import { DataTable } from '@verbb/plugin-kit-vue/components';
import {
    filterRows,
    filterColumns,
    filterDefinitions,
} from './data-table-filters.fixtures';
</script>
<template>
    <DataTable
        label="Membership filters"
        :rows="filterRows"
        :columns="filterColumns"
        :filters="filterDefinitions"
    />
</template>
