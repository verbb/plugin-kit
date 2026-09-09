<script setup lang="ts">
import { ref } from 'vue';
import { ImageBrowser } from '@verbb/plugin-kit-vue/components';
import { docsImageLabeledItems } from '../../../web/components/examples/image-browser.fixtures';

const value = ref('seagulls.jpg');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value ?? '';
}
</script>

<template>
    <ImageBrowser
        :value="value"
        mode="image"
        placeholder="Choose a preview image"
        search-placeholder="Search images"
        :items="docsImageLabeledItems"
        @pk-change="onChange"
    />
</template>
