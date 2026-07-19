<script setup lang="ts">
import { Button, Popover } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Popover placement="top">
        <Button slot="trigger">Top</Button>
        <div>Popover on top</div>
    </Popover>
    <Popover placement="bottom">
        <Button slot="trigger">Bottom</Button>
        <div>Popover on bottom</div>
    </Popover>
</template>
