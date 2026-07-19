<script setup lang="ts">
import { Button, ButtonGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ButtonGroup size="sm">
        <Button variant="primary">Small</Button>
        <Button variant="primary">Group</Button>
    </ButtonGroup>
    <ButtonGroup>
        <Button variant="primary">Default</Button>
        <Button variant="primary">Group</Button>
    </ButtonGroup>
</template>
