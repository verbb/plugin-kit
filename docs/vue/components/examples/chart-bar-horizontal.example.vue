<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { topForms } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <BarChart
        label="Top forms by submissions"
        orientation="horizontal"
        value-labels
        :data="topForms"
        style="--pk-chart-height: 200px"
    />
</template>
