<script setup lang="ts">
import { Calendar } from '@verbb/plugin-kit-vue/components';
import { calendarRange } from '../../../.vitepress/theme/components/calendarDemoDates';
</script>

<template>
    <Calendar mode="range" :value="calendarRange(0, 7)" />
</template>
