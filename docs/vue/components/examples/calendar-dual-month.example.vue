<script setup lang="ts">
import { Calendar } from '@verbb/plugin-kit-vue/components';
import { calendarRange } from '../../../.vitepress/theme/components/calendarDemoDates';
</script>

<template>
    <Calendar mode="range" :months="2" :value="calendarRange(0, 14)" />
</template>
