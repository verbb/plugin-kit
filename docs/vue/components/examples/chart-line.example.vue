<script setup lang="ts">
import { LineChart } from '@verbb/plugin-kit-vue/components';
import { formSubmissions } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <LineChart label="Form submissions by day" :data="formSubmissions" />
</template>
