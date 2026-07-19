<script setup lang="ts">
import { Status } from '@verbb/plugin-kit-vue/components';

/** Full built-in status aliases — same set as the playground / published docs. */
const statusVariants = [
    'all',
    'on',
    'live',
    'active',
    'enabled',
    'off',
    'suspended',
    'expired',
    'warning',
    'pending',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'turquoise',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'light',
    'gray',
    'grey',
    'white',
    'black',
    'disabled',
    'inactive',
] as const;

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))',
    gap: '12px',
    width: '100%',
};

const tileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#374151',
};
</script>

<template>
    <div :style="gridStyle">
        <div v-for="status in statusVariants" :key="status" :style="tileStyle">
            <Status :status="status" :aria-label="status" />
            <span>{{ status }}</span>
        </div>
    </div>
</template>
