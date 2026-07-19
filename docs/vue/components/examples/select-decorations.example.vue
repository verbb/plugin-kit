<script setup lang="ts">
import { Icon, Option, Select } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Select value="demo" style="min-width: 12rem;">
        <Icon slot="start" icon="house" aria-hidden="true" />
        <Icon slot="end" icon="flag-checkered" aria-hidden="true" />
        <Option value="demo">Medium</Option>
        <Option value="large">Large</Option>
    </Select>
</template>
