<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { revenueByMonth } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <BarChart label="Recovered revenue by month" :data="revenueByMonth" />
</template>
