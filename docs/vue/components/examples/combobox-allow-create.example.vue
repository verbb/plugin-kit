<script setup lang="ts">
import { Combobox, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Combobox allow-create placeholder="Search or create tags…" style="min-width: 16rem;">
        <Option value="design">Design</Option>
        <Option value="engineering">Engineering</Option>
        <Option value="marketing">Marketing</Option>
    </Combobox>
</template>
