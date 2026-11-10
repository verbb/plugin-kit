<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { visitorsByDevice } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart label="Visitors by device, by day" :data="visitorsByDevice" />
</template>
