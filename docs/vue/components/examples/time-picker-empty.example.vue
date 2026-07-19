<script setup lang="ts">
import { ref } from 'vue';
import { TimePicker } from '@verbb/plugin-kit-vue/components';

const value = ref('');
</script>

<template>
    <TimePicker
        :value="value"
        placeholder="Pick reminder time"
        @change="(event: Event) => { value = (event.target as HTMLInputElement).value; }"
    />
</template>
