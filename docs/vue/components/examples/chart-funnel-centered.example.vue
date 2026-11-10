<script setup lang="ts">
import { FunnelChart } from '@verbb/plugin-kit-vue/components';
import { applicationCompletion } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <FunnelChart
        label="Job Application completion by page"
        shape="centered"
        of-previous-label="of the previous page"
        of-first-label="of people who started"
        table-toggle
        :data="applicationCompletion"
    />
</template>
