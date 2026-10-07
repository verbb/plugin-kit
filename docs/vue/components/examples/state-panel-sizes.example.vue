<script setup lang="ts">
import { Button, StatePanel } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: grid; gap: 12px; width: 100%;">
        <StatePanel size="sm" variant="error" heading="Small error state" details-open copyable>
            The requested item could not be loaded.
            <pre slot="details">Request failed.</pre>
            <Button slot="actions" variant="primary">Try Again</Button>
        </StatePanel>

        <StatePanel variant="error" heading="Default error state" details-open copyable>
            The requested item could not be loaded.
            <pre slot="details">Request failed.</pre>
            <Button slot="actions" variant="primary">Try Again</Button>
        </StatePanel>

        <StatePanel size="lg" variant="error" heading="Large error state" details-open copyable>
            The requested item could not be loaded.
            <pre slot="details">Request failed.</pre>
            <Button slot="actions" variant="primary">Try Again</Button>
        </StatePanel>
    </div>
</template>
