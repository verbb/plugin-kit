<script setup lang="ts">
import { Option, OptionGroup, Select, Separator } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Select placeholder="Select produce">
        <OptionGroup label="Fruits">
            <Option value="apple">Apple</Option>
            <Option value="banana">Banana</Option>
            <Option value="blueberry">Blueberry</Option>
            <Option value="grapes">Grapes</Option>
            <Option value="pineapple">Pineapple</Option>
        </OptionGroup>
        <Separator />
        <OptionGroup label="Vegetables">
            <Option value="carrot">Carrot</Option>
            <Option value="broccoli">Broccoli</Option>
        </OptionGroup>
    </Select>
</template>
