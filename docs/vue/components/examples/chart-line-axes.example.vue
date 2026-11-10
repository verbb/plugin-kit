<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { completionRate } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart
        label="Job Application completion rate by week"
        x-label="Week starting"
        y-label="Completion rate"
        :min="0"
        :max="1"
        curve="linear"
        :data="completionRate"
    />
</template>
