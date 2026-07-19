<script setup lang="ts">
import { Button, Tooltip } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tooltip content="Move this item out of the active list.">
        <Button slot="trigger" variant="outline">Archive</Button>
    </Tooltip>
</template>
