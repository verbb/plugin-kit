<script setup lang="ts">
import { Input } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="max-width: 20rem;">
            <Input placeholder="Full width by default" />
        </div>
        <Input style="width: 220px;" placeholder="Fixed width" />
    </div>
</template>
