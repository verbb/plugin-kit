<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { BarChart, Button, LineChart } from '@verbb/plugin-kit-vue/components';
import type { ChartData } from '@verbb/plugin-kit-vue/components';
import { topForms } from '../../../web/components/examples/chart.fixtures';

const noRevenue: ChartData = {
    cols: [
        { id: 'date', label: 'Date', type: 'date', bucket: 'day' },
        { id: 'revenue', label: 'Recovered revenue', type: 'money', currency: 'USD' },
    ],
    rows: [],
};

const state = ref<'error' | 'loading' | ''>('error');
const data = ref<ChartData | null>(null);
let timer: number | undefined;

onBeforeUnmount(() => window.clearTimeout(timer));

function retry() {
    state.value = 'loading';

    // Replace this simulated request with your plugin's own endpoint.
    timer = window.setTimeout(() => {
        data.value = topForms;
        state.value = '';
    }, 800);
}
</script>

<template>
    <div style="display: grid; gap: 24px">
        <LineChart
            label="Recovered revenue by day"
            empty-heading="No recovered orders yet"
            :data="noRevenue"
            style="--pk-chart-height: 180px"
        >
            <p slot="empty">
                Recovered orders appear here once a customer completes a cart from a recovery email.
                Check that at least one <strong>recovery sequence</strong> is enabled.
            </p>
        </LineChart>

        <BarChart
            label="Top forms by submissions"
            orientation="horizontal"
            :state="state"
            error-message="The server took too long to respond. Try again, or choose a shorter date range."
            :data="data"
            style="--pk-chart-height: 180px"
        >
            <Button slot="state-actions" @click="retry">Try Again</Button>
        </BarChart>
    </div>
</template>
