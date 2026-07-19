<script setup lang="ts">
import { Icon, Toggle } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Toggle pressed>
        <Icon icon="italic" />
        Italic
    </Toggle>
    <Toggle variant="outline" pressed>
        <Icon icon="bold" />
        Bold
    </Toggle>
</template>
