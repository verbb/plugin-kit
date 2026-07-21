<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from '@verbb/plugin-kit-vue/components';

// `multiple` mode stores a comma-separated, sorted list of ISO dates.
const value = ref('2026-05-04,2026-05-20');

function onChange(event: Event) {
    value.value = (event.target as { value: string }).value;
}
</script>

<template>
    <DatePicker
        mode="multiple"
        label="Availability"
        placeholder="Select dates"
        :value="value"
        @change="onChange"
    />
</template>
