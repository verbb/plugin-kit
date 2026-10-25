<script setup lang="ts">
import { Button, ButtonGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ButtonGroup>
        <Button size="xxs" variant="primary">Extra extra small</Button>
        <Button size="xxs" variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button size="xs" variant="primary">Extra small</Button>
        <Button size="xs" variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button size="sm" variant="primary">Small</Button>
        <Button size="sm" variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button size="default" variant="primary">Default</Button>
        <Button size="default" variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button size="lg" variant="primary">Large</Button>
        <Button size="lg" variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button size="xl" variant="primary">Extra large</Button>
        <Button size="xl" variant="primary">Group</Button>
    </ButtonGroup>
</template>
