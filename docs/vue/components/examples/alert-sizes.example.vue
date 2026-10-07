<script setup lang="ts">
import { Alert, Button } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: grid; gap: 12px; width: 100%;">
        <Alert size="sm" heading="Small alert" details-open copyable dismissible>
            Review this configuration before saving.
            <pre slot="details">Environment: production</pre>
            <Button slot="actions" variant="secondary">Review</Button>
        </Alert>

        <Alert heading="Default alert" details-open copyable dismissible>
            Review this configuration before saving.
            <pre slot="details">Environment: production</pre>
            <Button slot="actions" variant="secondary">Review</Button>
        </Alert>

        <Alert size="lg" heading="Large alert" details-open copyable dismissible>
            Review this configuration before saving.
            <pre slot="details">Environment: production</pre>
            <Button slot="actions" variant="secondary">Review</Button>
        </Alert>
    </div>
</template>
