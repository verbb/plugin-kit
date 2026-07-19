<script setup lang="ts">
import { DatePicker } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DatePicker disable-past placeholder="Future dates only" />
    <DatePicker disable-future placeholder="Past dates only" />
    <DatePicker disabled-days-of-week="sat sun" placeholder="Weekdays only" />
    <DatePicker min="2026-01-01" max="2026-12-31" placeholder="Within 2026" />
</template>
