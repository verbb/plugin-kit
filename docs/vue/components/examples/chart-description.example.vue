<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { recoveredRevenue } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart
        label="Recovered revenue by day"
        description="Recovered revenue was 18% higher than the previous 14 days, peaking at $1,104.90 on Wednesday 4 November."
        area
        :data="recoveredRevenue"
    />
</template>
