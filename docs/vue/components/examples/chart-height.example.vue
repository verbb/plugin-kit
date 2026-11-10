<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { pageViews } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart label="Page views by day" area :data="pageViews" style="--pk-chart-height: 340px" />
</template>
