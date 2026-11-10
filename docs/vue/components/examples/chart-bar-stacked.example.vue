<script setup lang="ts">
import { BarChart } from '@verbb/plugin-kit-vue/components';
import { skippedCarts } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <BarChart label="Carts not emailed by week, by reason" stacked="normal" :data="skippedCarts" />
</template>
