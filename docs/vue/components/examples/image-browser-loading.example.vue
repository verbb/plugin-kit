<script setup lang="ts">
import { ImageBrowser } from '@verbb/plugin-kit-vue/components';
import { docsIconSvg } from '../../../web/components/examples/image-browser.fixtures';

// Host owns catalog fetch — set loading until items/groups arrive.
</script>

<template>
    <ImageBrowser
        value="star"
        loading
        open
        selected-label="Star"
        :selected-preview="docsIconSvg.star"
        placeholder="Choose an icon"
        search-placeholder="Search icons"
    />
</template>
