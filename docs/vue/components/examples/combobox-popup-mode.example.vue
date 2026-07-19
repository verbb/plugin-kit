<script setup lang="ts">
import { Combobox, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Combobox popup-mode placeholder="Select a country" value="ar">
        <Option value="ar">Argentina</Option>
        <Option value="au">Australia</Option>
        <Option value="br">Brazil</Option>
        <Option value="ca">Canada</Option>
    </Combobox>
</template>
