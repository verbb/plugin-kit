<script setup lang="ts">
import { DonutChart } from '@verbb/plugin-kit-vue/components';
import { visitorsByCountry } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <DonutChart label="Visitors by country" table-toggle :data="visitorsByCountry" />
</template>
