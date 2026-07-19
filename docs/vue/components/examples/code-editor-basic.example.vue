<script setup lang="ts">
import { ref } from 'vue';
import { CodeEditor } from '@verbb/plugin-kit-vue/components';

const value = ref('<p>Hello <strong>world</strong></p>');
</script>

<template>
    <CodeEditor
        :value="value"
        language="html"
        :rows="8"
        @pk-change="(event: CustomEvent<{ value: string }>) => { value = event.detail.value; }"
    />
</template>
