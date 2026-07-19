<script setup lang="ts">
import { Icon, Toggle } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Toggle size="sm">
        <Icon icon="bold" />
        Bold
    </Toggle>
    <Toggle>
        <Icon icon="italic" />
        Italic
    </Toggle>
    <Toggle size="lg">
        <Icon icon="underline" />
        Underline
    </Toggle>
</template>
