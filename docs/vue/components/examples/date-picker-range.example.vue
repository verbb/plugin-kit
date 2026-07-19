<script setup lang="ts">
import { DatePicker } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <DatePicker
        mode="range"
        :months="2"
        label="Booking"
        placeholder="Select a range"
    />
</template>
