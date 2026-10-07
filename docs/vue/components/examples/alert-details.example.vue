<script setup lang="ts">
import { Alert } from '@verbb/plugin-kit-vue/components';

const details = `Module: example:picker
Code: MODULE_UNAVAILABLE
Error: Provider failed to initialise.`;
</script>

<template>
    <Alert
        variant="error"
        heading="A required feature could not start."
        announce="assertive"
        copyable
    >
        Reload the page. If the problem continues, copy the technical details below.
        <pre slot="details">{{ details }}</pre>
    </Alert>
</template>
