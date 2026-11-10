<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { completionTime } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart
        label="Job Application average time to complete, by week"
        curve="linear"
        :data="completionTime"
    />
</template>
