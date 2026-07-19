<script setup lang="ts">
import { ref } from 'vue';
import { TimePicker } from '@verbb/plugin-kit-vue/components';

const value = ref('09:00');
</script>

<template>
    <TimePicker
        :value="value"
        placeholder="Select time"
        @change="(event: Event) => { value = (event.target as HTMLInputElement).value; }"
    />
</template>
