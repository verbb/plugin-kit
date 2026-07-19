<script setup lang="ts">
import { Button, ButtonGroup, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <ButtonGroup>
        <Button variant="primary">
            <Icon slot="start" icon="pen-to-square" />
            Edit
        </Button>
        <Button variant="primary">
            <Icon slot="start" icon="eye" />
            Preview
        </Button>
        <Button variant="primary" group-trigger aria-label="More actions" />
    </ButtonGroup>
</template>
