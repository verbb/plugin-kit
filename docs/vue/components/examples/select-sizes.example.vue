<script setup lang="ts">
import { Option, Select } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Select size="xs" placeholder="Select a fruit" value="apple">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="blueberry">Blueberry</Option>
        <Option value="grapes">Grapes</Option>
        <Option value="pineapple">Pineapple</Option>
    </Select>
    <Select size="sm" placeholder="Select a fruit" value="apple">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="blueberry">Blueberry</Option>
        <Option value="grapes">Grapes</Option>
        <Option value="pineapple">Pineapple</Option>
    </Select>
    <Select placeholder="Select a fruit" value="apple">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="blueberry">Blueberry</Option>
        <Option value="grapes">Grapes</Option>
        <Option value="pineapple">Pineapple</Option>
    </Select>
    <Select size="lg" placeholder="Select a fruit" value="apple">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="blueberry">Blueberry</Option>
        <Option value="grapes">Grapes</Option>
        <Option value="pineapple">Pineapple</Option>
    </Select>
</template>
