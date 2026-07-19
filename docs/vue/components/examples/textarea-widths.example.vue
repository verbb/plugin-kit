<script setup lang="ts">
import { Textarea } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="max-width: 24rem;">
            <Textarea placeholder="Full width by default" />
        </div>
        <Textarea style="width: 320px;" placeholder="Fixed width" />
    </div>
</template>
