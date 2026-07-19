<script setup lang="ts">
import { Icon, Toggle } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Toggle>
        <Icon icon="bold" />
        Bold
    </Toggle>
    <Toggle variant="outline">
        <Icon icon="italic" />
        Italic
    </Toggle>
</template>
