<script setup lang="ts">
import { Alert } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div :style="{ display: 'grid', gap: '12px', width: '100%' }">
        <Alert appearance="accent" heading="Accent">
            A leading accent gives the alert the most emphasis.
        </Alert>
        <Alert appearance="filled-outlined" heading="Filled and outlined">
            A quiet fill and border contain the message.
        </Alert>
        <Alert appearance="filled" heading="Filled">
            A quiet fill groups the message without a border.
        </Alert>
        <Alert appearance="outlined" heading="Outlined">
            A border defines the alert without a background fill.
        </Alert>
        <Alert appearance="plain" heading="Plain">
            Content appears without a fill or border.
        </Alert>
    </div>
</template>
