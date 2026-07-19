<script setup lang="ts">
import { Combobox, Option, OptionGroup, Separator } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Combobox placeholder="Select produce…">
        <OptionGroup label="Fruits">
            <Option value="apple">Apple</Option>
            <Option value="banana">Banana</Option>
        </OptionGroup>
        <Separator />
        <OptionGroup label="Vegetables">
            <Option value="carrot">Carrot</Option>
            <Option value="broccoli">Broccoli</Option>
        </OptionGroup>
    </Combobox>
</template>
