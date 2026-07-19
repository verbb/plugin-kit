<script setup lang="ts">
import { Spinner } from '@verbb/plugin-kit-vue/components';

const wrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '24px',
};

const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

const labelStyle = {
    fontSize: '12px',
    color: '#64748b',
};

const sizes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<template>
    <div :style="wrapStyle">
        <div v-for="size in sizes" :key="size" :style="itemStyle">
            <Spinner :size="size" />
            <span :style="labelStyle">{{ size }}</span>
        </div>
    </div>
</template>
