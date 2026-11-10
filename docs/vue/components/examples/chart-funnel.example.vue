<script setup lang="ts">
import { FunnelChart } from '@verbb/plugin-kit-vue/components';
import { cartRecovery } from '../../../web/components/examples/chart.fixtures';
</script>

<template>
    <FunnelChart label="Cart recovery funnel" :data="cartRecovery" />
</template>
