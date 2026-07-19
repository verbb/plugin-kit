<script setup lang="ts">
import { Separator } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; align-items: center; gap: 12px; height: 2rem;">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Center</span>
        <Separator orientation="vertical" />
        <span>Right</span>
    </div>
</template>
