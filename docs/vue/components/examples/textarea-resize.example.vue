<script setup lang="ts">
import { Textarea } from '@verbb/plugin-kit-vue/components';

const value = 'Try dragging the resize handle.\n\nIt should resize vertically.';
</script>

<template>
    <Textarea :value="value" />
</template>
