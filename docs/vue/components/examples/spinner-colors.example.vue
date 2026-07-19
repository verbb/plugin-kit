<script setup lang="ts">
import { Spinner } from '@verbb/plugin-kit-vue/components';

const wrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '20px',
};
</script>

<template>
    <div :style="wrapStyle">
        <Spinner tone="sky" />
        <Spinner tone="emerald" />
        <Spinner tone="violet" />
        <Spinner tone="amber" />
    </div>
</template>
