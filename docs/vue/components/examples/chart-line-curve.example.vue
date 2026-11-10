<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { pageViews } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <div style="display: grid; gap: 24px">
        <LineChart label="Page views by day" area :data="pageViews" style="--pk-chart-height: 180px" />
        <LineChart label="Page views by day" area curve="linear" :data="pageViews" style="--pk-chart-height: 180px" />
    </div>
</template>
