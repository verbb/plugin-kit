<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { revenueByMonth } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <div style="--pk-chart-height: 160px; --pk-chart-series-1: var(--pk-color-teal-600); --pk-chart-grid: transparent">
        <BarChart label="Recovered revenue by month" :data="revenueByMonth" />
    </div>
</template>
