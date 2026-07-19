<script setup lang="ts">
import { Button, Input, Popover } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Popover>
        <Button slot="trigger">Edit dimensions</Button>
        <div style="display: flex; flex-direction: column; gap: 12px; min-width: 16rem;">
            <Input placeholder="Width" />
            <Input placeholder="Height" />
            <Button variant="primary">Apply</Button>
        </div>
    </Popover>
</template>
