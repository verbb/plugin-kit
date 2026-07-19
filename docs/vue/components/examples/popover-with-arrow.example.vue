<script setup lang="ts">
import { Button, Popover } from '@verbb/plugin-kit-vue/components';

const arrowPopovers = [
    { placement: 'top' as const, label: 'Top' },
    { placement: 'right' as const, label: 'Right' },
    { placement: 'bottom' as const, label: 'Bottom' },
    { placement: 'left' as const, label: 'Left' },
];
</script>

<template>
    <Popover
        v-for="item in arrowPopovers"
        :key="item.placement"
        with-arrow
        :placement="item.placement"
    >
        <Button slot="trigger">{{ item.label }}</Button>
        <div>
            <strong style="font-size: 14px;">Arrow popover</strong>
            <p style="margin: 4px 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                The arrow tracks placement and stays aimed at the trigger.
            </p>
        </div>
    </Popover>
</template>
