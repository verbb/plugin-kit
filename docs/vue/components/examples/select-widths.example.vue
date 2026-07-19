<script setup lang="ts">
import { Option, Select } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Select placeholder="Select a fruit" width="full" style="max-width: 20rem;">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="blueberry">Blueberry</Option>
        <Option value="grapes">Grapes</Option>
        <Option value="pineapple">Pineapple</Option>
    </Select>
    <Select placeholder="Select a fruit" style="width: 12rem;">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="blueberry">Blueberry</Option>
        <Option value="grapes">Grapes</Option>
        <Option value="pineapple">Pineapple</Option>
    </Select>
</template>
