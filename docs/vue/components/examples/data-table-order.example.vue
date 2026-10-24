<script setup lang="ts">
import { ref } from 'vue';
import { DataTable, type DataTableRowReorderDetail } from '@verbb/plugin-kit-vue/components';
import { orderColumns, orderRows } from '../../../web/components/examples/data-table-order.fixtures';

const rows = ref(orderRows);
const saving = ref(false);
const failNext = ref(false);
const message = ref('Drag a handle, or focus it and press Up or Down.');
async function reorder(event: CustomEvent<DataTableRowReorderDetail>) {
    const { detail } = event;
    rows.value = detail.rows;
    saving.value = true;
    message.value = 'Saving…';
    const fail = failNext.value;
    failNext.value = false;
    // Replace this simulated save with your application's persistence request.
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (fail) {
        rows.value = detail.previousRows;
        message.value = 'Save failed. The previous order was restored.';
    } else {
        message.value = `Saved order: ${detail.orderedKeys.join(', ')}.`;
    }
    saving.value = false;
}
</script>
<template>
    <label><input v-model="failNext" type="checkbox"> Fail next save</label>
    <DataTable label="Filesystem order" row-label="name" manual-order
        :reorder-disabled="saving" :rows="rows" :columns="orderColumns"
        @pk-row-reorder="reorder" />
    <output aria-live="polite">{{ message }}</output>
</template>
