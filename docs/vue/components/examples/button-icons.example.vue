<script setup lang="ts">
import { Button, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Button>
        <Icon slot="start" icon="eye" />
        Prepend
    </Button>
    <Button>
        Append
        <Icon slot="end" icon="eye" />
    </Button>
    <Button>
        <Icon slot="start" icon="plus" />
        Both
        <Icon slot="end" icon="eye" />
    </Button>
    <Button aria-label="View">
        <Icon slot="start" icon="eye" />
    </Button>
</template>
