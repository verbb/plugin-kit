<script setup lang="ts">
import { DonutChart } from '@verbb/plugin-kit-vue/components';
import { visitorsByCountry } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <DonutChart
        label="Visitors by country"
        :max-segments="4"
        other-label="Other countries"
        :data="visitorsByCountry"
        style="--pk-chart-height: 200px"
    />
</template>
