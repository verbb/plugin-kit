<script setup lang="ts">
import { Lightswitch } from '@verbb/plugin-kit-vue/components';

const sizes = [
    { label: 'Extra extra small', size: 'xxs' as const },
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
];
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px; font-size: 14px;">
        <div
            v-for="item in sizes"
            :key="item.size"
            style="display: flex; align-items: center; gap: 8px;"
        >
            <Lightswitch :size="item.size" />
            <span>{{ item.label }}</span>
        </div>
    </div>
</template>
