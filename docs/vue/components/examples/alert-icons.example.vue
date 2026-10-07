<script setup lang="ts">
import { Alert, Icon } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: grid; gap: 12px; width: 100%;">
        <Alert variant="neutral" heading="Integration settings updated.">
            <Icon slot="icon" icon="gear" aria-hidden="true" />
            The alert can use a product-specific icon.
        </Alert>
        <Alert variant="info" heading="No icon needed." hide-icon>
            Hide the icon when the message is clear without one.
        </Alert>
    </div>
</template>
