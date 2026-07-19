<script setup lang="ts">
import { Calendar } from '@verbb/plugin-kit-vue/components';
import { calendarDate, calendarDisabledDates } from '../../../.vitepress/theme/components/calendarDemoDates';
</script>

<template>
    <Calendar
        :value="calendarDate()"
        :disabled-dates="calendarDisabledDates([3, 4, 5])"
    />
</template>
