<script setup lang="ts">
import { Button, Tooltip } from '@verbb/plugin-kit-vue/components';

const sides = ['top', 'right', 'bottom', 'left'] as const;
</script>

<template>
    <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <Tooltip
            v-for="side in sides"
            :key="side"
            :placement="side"
            :content="`Tooltip on the ${side}`"
        >
            <Button slot="trigger" variant="outline">{{ side }}</Button>
        </Tooltip>
    </div>
</template>
