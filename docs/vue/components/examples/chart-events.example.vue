<script setup lang="ts">
import { ref } from 'vue';
import { LineChart } from '@verbb/plugin-kit-vue/components';
import type { PkLegendToggleDetail, PkPointSelectDetail } from '@verbb/plugin-kit-vue/components';
import { submissionsByStatus } from '../../../web/components/examples/chart.fixtures';

const message = ref('Click a point, toggle a legend item, or switch to the table.');

function onPointSelect(event: CustomEvent<PkPointSelectDetail>) {
    const { index, row, series, value } = event.detail;
    message.value = `pk-point-select: ${series} on ${String(row?.[0])} is ${String(value)} (row ${index})`;
}

function onLegendToggle(event: CustomEvent<PkLegendToggleDetail>) {
    const { key, label, hidden } = event.detail;
    message.value = `pk-legend-toggle: ${label} (${key}) is now ${hidden ? 'hidden' : 'shown'}`;
}

function onViewChange(event: CustomEvent<{ view: string }>) {
    message.value = `pk-view-change: ${event.detail.view}`;
}
</script>

<template>
    <LineChart
        label="Form submissions by day, by status"
        table-toggle
        :data="submissionsByStatus"
        @pk-point-select="onPointSelect"
        @pk-legend-toggle="onLegendToggle"
        @pk-view-change="onViewChange"
    />
    <output aria-live="polite" style="display: block; margin-top: 12px; font-size: 13px">{{ message }}</output>
</template>
