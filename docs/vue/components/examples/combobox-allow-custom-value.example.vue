<script setup lang="ts">
import { Combobox, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Combobox allow-custom-value placeholder="Type or select a color…" style="min-width: 16rem;">
        <Option value="red">Red</Option>
        <Option value="green">Green</Option>
        <Option value="blue">Blue</Option>
    </Combobox>
</template>
