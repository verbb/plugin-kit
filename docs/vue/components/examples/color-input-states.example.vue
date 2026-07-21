<script setup lang="ts">
import { ref } from 'vue';
import { ColorInput } from '@verbb/plugin-kit-vue/components';

const value = ref('#e64d4c');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <ColorInput :value="value" @pk-change="onChange" />
    <ColorInput value="#ff" invalid />
    <ColorInput value="#64748b" readonly />
    <ColorInput value="#64748b" disabled />
</template>
