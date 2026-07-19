<script setup lang="ts">
import { TiptapInput } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <TiptapInput value="Invalid value" invalid />
        <TiptapInput value="Disabled value" disabled />
        <TiptapInput value="Read-only value" readonly />
    </div>
</template>
