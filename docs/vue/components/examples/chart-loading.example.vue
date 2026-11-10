<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { BarChart, Button } from '@verbb/plugin-kit-vue/components';
import type { ChartData } from '@verbb/plugin-kit-vue/components';
import { revenueByMonth } from '../../../web/components/examples/chart.fixtures';

const data = ref<ChartData | null>(null);
const loading = ref(true);
let timer: number | undefined;

// Simulate the first request, then a refresh that keeps the current chart visible.
onMounted(() => {
    timer = window.setTimeout(() => {
        data.value = revenueByMonth;
        loading.value = false;
    }, 1500);
});

onBeforeUnmount(() => window.clearTimeout(timer));

function refresh() {
    loading.value = true;
    timer = window.setTimeout(() => {
        loading.value = false;
    }, 1200);
}
</script>

<template>
    <BarChart label="Recovered revenue by month" :state="loading ? 'loading' : ''" :data="data" />
    <Button @click="refresh">Refresh</Button>
</template>
