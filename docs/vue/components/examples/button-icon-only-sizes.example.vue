<script setup lang="ts">
import { Button, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <Button size="xxs" aria-label="View">
            <Icon slot="start" icon="eye" />
        </Button>
        <Button size="xs" aria-label="View">
            <Icon slot="start" icon="eye" />
        </Button>
        <Button size="sm" aria-label="View">
            <Icon slot="start" icon="eye" />
        </Button>
        <Button aria-label="View">
            <Icon slot="start" icon="eye" />
        </Button>
        <Button size="lg" aria-label="View">
            <Icon slot="start" icon="eye" />
        </Button>
        <Button size="xl" aria-label="View">
            <Icon slot="start" icon="eye" />
        </Button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <Button variant="none" size="sm" icon aria-label="Remove">
            <Icon slot="start" icon="xmark" />
        </Button>
        <Button variant="none" icon aria-label="More">
            <Icon slot="start" icon="ellipsis" />
        </Button>
    </div>
</template>
