<script setup lang="ts">
import { Lightswitch } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <Lightswitch checked>
            Enable notifications
        </Lightswitch>
        <Lightswitch instructions="Save form changes while editing.">
            Auto-save drafts
        </Lightswitch>
    </div>
</template>
