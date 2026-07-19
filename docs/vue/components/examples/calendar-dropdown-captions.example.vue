<script setup lang="ts">
import { Calendar } from '@verbb/plugin-kit-vue/components';
import { calendarDate, calendarRange } from '../../../.vitepress/theme/components/calendarDemoDates';
</script>

<template>
    <Calendar :value="calendarDate()" />
    <Calendar mode="range" :value="calendarRange(0, 7)" />
</template>
