<script setup lang="ts">
import { ref } from 'vue';
import { BarChart, Button } from '@verbb/plugin-kit-vue/components';
import { submissionsBySite } from '../../../web/components/examples/chart.fixtures';

// A new data object redraws the chart; it animates in only on its first draw.
const site = ref<'au' | 'nz'>('au');
</script>

<template>
    <Button @click="site = 'au'">Australia</Button>
    <Button @click="site = 'nz'">New Zealand</Button>
    <div style="height: 12px" />
    <BarChart
        label="Form submissions by day, last 7 days"
        :data="submissionsBySite[site]"
        style="--pk-chart-height: 200px"
    />
</template>
