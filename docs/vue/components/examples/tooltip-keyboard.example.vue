<script setup lang="ts">
import { Button, Tooltip } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Tooltip content="Tooltips are available from both pointer and keyboard focus.">
        <Button slot="trigger" variant="transparent">Focus or hover</Button>
    </Tooltip>
</template>
