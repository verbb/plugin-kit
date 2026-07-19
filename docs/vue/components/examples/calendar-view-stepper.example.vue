<script setup lang="ts">
import { Calendar } from '@verbb/plugin-kit-vue/components';
import { calendarDate } from '../../../.vitepress/theme/components/calendarDemoDates';
</script>

<template>
    <div style="font-size: 12px; color: #6b7280; margin: 0 0 8px;">
        Click the month/year title to step into month and year views.
    </div>
    <Calendar :value="calendarDate()" />
</template>
