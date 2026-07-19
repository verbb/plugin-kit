<script setup lang="ts">
import { Button, Field, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Field
        label="Static Options"
        instructions="Add, remove, or reorder option rows manually."
    >
        <Button slot="header-end" size="sm">
            <Icon slot="start" icon="plus" />
            Bulk add options
        </Button>
        <div>Option rows would render here.</div>
    </Field>
</template>
