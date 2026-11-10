<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { deviceShare } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <BarChart
        label="Visitor device share by traffic source"
        orientation="horizontal"
        stacked="percent"
        :data="deviceShare"
        style="--pk-chart-height: 220px"
    />
</template>
