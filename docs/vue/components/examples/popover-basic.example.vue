<script setup lang="ts">
import { Button, Popover } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Popover>
        <Button slot="trigger">Open popover</Button>
        <div>
            <strong style="font-size: 14px; color: #0f172a;">Dimensions</strong>
            <p style="margin: 4px 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                Set the width and height for the selected element.
            </p>
        </div>
    </Popover>
</template>
