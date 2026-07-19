<script setup lang="ts">
import { TimePicker } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <TimePicker value="09:30" />
        <TimePicker value="09:30" disabled />
        <TimePicker value="99:99" invalid />
    </div>
</template>
