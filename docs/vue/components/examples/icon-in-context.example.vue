<script setup lang="ts">
import { Button, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Button variant="dashed">
        <Icon slot="start" icon="plus" />
        Add a link
    </Button>
    <Button aria-label="Settings">
        <Icon slot="start" icon="gear" />
    </Button>
</template>
