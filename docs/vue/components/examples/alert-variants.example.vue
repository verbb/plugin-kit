<script setup lang="ts">
import { Alert } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div :style="{ display: 'grid', gap: '12px', width: '100%' }">
        <Alert variant="info" heading="New options are available.">
            Review the defaults before saving this screen.
        </Alert>
        <Alert variant="neutral" heading="This setting is managed externally.">
            Make changes in the connected service.
        </Alert>
        <Alert variant="success" heading="Settings saved.">
            Your changes are now active.
        </Alert>
        <Alert variant="warning" heading="Review this configuration.">
            One or more values may need attention.
        </Alert>
        <Alert variant="error" heading="The request could not be completed.">
            Check the values and try again.
        </Alert>
    </div>
</template>
