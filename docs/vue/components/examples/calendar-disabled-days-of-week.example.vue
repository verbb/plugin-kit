<script setup lang="ts">
import { Calendar } from '@verbb/plugin-kit-vue/components';
import { calendarDate } from '../../../.vitepress/theme/components/calendarDemoDates';
</script>

<template>
    <Calendar
        :value="calendarDate()"
        disabled-days-of-week="sat sun"
    />
</template>
