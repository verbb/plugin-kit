<script setup lang="ts">
import { Button, ButtonGroup, Popover } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ButtonGroup>
        <Button variant="primary">Filter</Button>
        <Popover>
            <Button slot="trigger" variant="primary" group-trigger aria-label="Filter options" />
            <div style="min-width: 12rem; padding: 0.75rem;">
                Filter options
            </div>
        </Popover>
    </ButtonGroup>
</template>
