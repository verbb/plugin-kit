<script setup lang="ts">
import { Button, StatePanel } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <StatePanel
        variant="error"
        heading="An error has occurred"
        details-label="Show error details"
        copy-label="Copy error details"
        copied-label="Error details copied."
        copyable
        style="--pk-state-panel-min-height: 22rem;"
    >
        The requested form could not be found.

        <pre slot="details">FormNotFound: Unable to load form 42.</pre>

        <Button slot="actions" variant="primary">Try Again</Button>
    </StatePanel>
</template>
