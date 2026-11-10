<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { ordersByEmail } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <BarChart label="Recovered orders by sequence and email" :data="ordersByEmail" />
</template>
