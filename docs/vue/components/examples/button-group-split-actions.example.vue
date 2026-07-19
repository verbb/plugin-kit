<script setup lang="ts">
import { Button, ButtonGroup, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ButtonGroup>
        <Button variant="primary">Publish</Button>
        <Button variant="primary" group-trigger aria-label="More publish actions" />
    </ButtonGroup>
    <ButtonGroup>
        <Button variant="outline">
            <Icon slot="start" icon="download" />
            Export
        </Button>
        <Button variant="outline" group-trigger aria-label="More export actions" />
    </ButtonGroup>
</template>
