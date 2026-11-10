<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { recoveredRevenue } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart label="Recovered revenue by day" area table-toggle :data="recoveredRevenue" />
</template>
