<script setup lang="ts">
import { StatePanel } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; width: 100%;"
    >
        <StatePanel variant="info" icon="gear" heading="Named icon">
            Use any icon registered with Plugin Kit.
        </StatePanel>
        <StatePanel variant="success" heading="Custom icon content">
            <svg slot="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l2.1 6.9L21 11l-6.9 2.1L12 20l-2.1-6.9L3 11l6.9-2.1L12 2Z" />
            </svg>
            Place an SVG or another rendered icon in the icon slot.
        </StatePanel>
        <StatePanel variant="warning" heading="No icon" hide-icon>
            Hide the icon when the message is clear without it.
        </StatePanel>
    </div>
</template>
