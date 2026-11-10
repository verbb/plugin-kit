<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { submissionsByStatus } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <p style="margin: 0 0 8px; font-size: 13px">Completed submissions in blue, incomplete in orange and spam in red.</p>
    <LineChart label="Form submissions by day, by status" legend="none" :data="submissionsByStatus" />
</template>
