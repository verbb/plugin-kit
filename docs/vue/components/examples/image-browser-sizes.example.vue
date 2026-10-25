<script setup lang="ts">
import { reactive } from 'vue';
import { ImageBrowser } from '@verbb/plugin-kit-vue/components';

const items = [
    { value: 'circle', label: 'Circle', preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>' },
    { value: 'square', label: 'Square', preview: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/></svg>' },
];
const sizes = ['xxs', 'xs', 'sm', 'default', 'lg', 'xl'] as const;
const values = reactive<Record<string, string>>({});

function onChange(size: string, event: CustomEvent<{ value: string }>) {
    values[size] = event.detail.value;
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div v-for="size in sizes" :key="size" style="display: flex; gap: 16px; align-items: center;">
            <span style="width: 64px;">{{ size }}</span>
            <ImageBrowser
                :size="size"
                :items="items"
                :value="values[size] ?? 'circle'"
                :aria-label="`${size} icon`"
                with-clear
                @pk-change="onChange(size, $event)"
            />
        </div>
    </div>
</template>
