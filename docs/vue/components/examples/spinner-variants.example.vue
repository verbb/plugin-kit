<script setup lang="ts">
import { Button } from '@verbb/plugin-kit-vue/components';

const wrapStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
};

const variants = ['default', 'primary', 'secondary', 'dashed', 'outline', 'transparent'] as const;
</script>

<template>
    <div :style="wrapStyle">
        <Button v-for="variant in variants" :key="variant" :variant="variant" loading>
            {{ variant }}
        </Button>
    </div>
</template>
