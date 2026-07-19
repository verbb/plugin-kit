<script setup lang="ts">
import { Button, Tooltip } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tooltip content="Tooltip content">
        <Button slot="trigger">Hover me</Button>
    </Tooltip>
</template>
