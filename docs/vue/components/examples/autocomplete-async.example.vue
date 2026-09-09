<script setup lang="ts">
import { ref } from 'vue';
import { Autocomplete } from '@verbb/plugin-kit-vue/components';

const value = ref('@webroot/');

const paths = [
    { value: '@webroot/', label: '@webroot/' },
    { value: '@webroot/assets/', label: '@webroot/assets/' },
    { value: '@webroot/cpnav-icons/', label: '@webroot/cpnav-icons/' },
    { value: '@webroot/uploads/', label: '@webroot/uploads/' },
    { value: '@storage/', label: '@storage/' },
    { value: '@storage/runtime/', label: '@storage/runtime/' },
    { value: '@templates/', label: '@templates/' },
    { value: '@config/', label: '@config/' },
    { value: '$PRIMARY_SITE_URL', label: '$PRIMARY_SITE_URL' },
    { value: '$CRAFT_WEB_ROOT', label: '$CRAFT_WEB_ROOT' },
];

async function fetchOptions(query: string) {
    await new Promise((resolve) => {
        window.setTimeout(resolve, 280);
    });

    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return [];
    }

    return paths.filter((item) => item.label.toLowerCase().includes(normalized));
}
</script>

<template>
    <Autocomplete
        async
        clearable
        width="full"
        placeholder="Search aliases and paths…"
        start-typing-message="Start typing to search paths…"
        :value="value"
        :fetchOptions="fetchOptions"
        @pk-change="(event: CustomEvent<{ value: string }>) => { value = event.detail.value; }"
    />
</template>
