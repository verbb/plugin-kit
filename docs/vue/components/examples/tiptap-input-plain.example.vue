<script setup lang="ts">
import { ref } from 'vue';
import { TiptapInput } from '@verbb/plugin-kit-vue/components';

const value = ref('Hello world');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <TiptapInput :value="value" placeholder="Write something" @pk-change="onChange" />
</template>
