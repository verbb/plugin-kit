<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { completionByForm } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <BarChart
        label="Completion rate by form"
        orientation="horizontal"
        x-label="Completion rate"
        :max="1"
        :data="completionByForm"
        style="--pk-chart-height: 220px"
    />
</template>
