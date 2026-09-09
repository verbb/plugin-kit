<script setup lang="ts">
import { ref } from 'vue';
import { ImageBrowser } from '@verbb/plugin-kit-vue/components';
import { docsIconItems } from '../../../web/components/examples/image-browser.fixtures';

const value = ref('star');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value ?? '';
}
</script>

<template>
    <ImageBrowser
        :value="value"
        label-mode="inline"
        placeholder="Choose an icon"
        search-placeholder="Search icons"
        :items="docsIconItems"
        @pk-change="onChange"
    />
</template>
