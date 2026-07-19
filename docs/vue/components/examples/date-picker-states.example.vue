<script setup lang="ts">
import { DatePicker } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <DatePicker label="Required" required with-clear placeholder="Required date" />
        <DatePicker label="Invalid" value="2026-01-15" invalid />
        <DatePicker label="Disabled" value="2026-05-20" disabled />
    </div>
</template>
