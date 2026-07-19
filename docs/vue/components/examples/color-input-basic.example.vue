<script setup lang="ts">
import { ref } from 'vue';
import { ColorInput } from '@verbb/plugin-kit-vue/components';

const value = ref('#35e533');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <ColorInput :value="value" @pk-change="onChange" />
</template>
