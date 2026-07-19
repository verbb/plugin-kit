<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from '@verbb/plugin-kit-vue/components';

const value = ref('2026-05-20');
</script>

<template>
    <DatePicker
        :value="value"
        placeholder="Pick a date"
        @change="(event: Event) => { value = (event.target as HTMLInputElement).value; }"
    />
</template>
