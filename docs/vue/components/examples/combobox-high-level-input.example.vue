<script setup lang="ts">
import { ref } from 'vue';
import { Button, ComboboxInput } from '@verbb/plugin-kit-vue/components';

const frameworks = [
    { label: 'Next.js', value: 'next-js' },
    { label: 'SvelteKit', value: 'sveltekit' },
    { label: 'Nuxt.js', value: 'nuxt-js' },
    { label: 'Remix', value: 'remix' },
    { label: 'Astro', value: 'astro' },
];

const frameworkValue = ref<string | number | null>(frameworks[0]?.value ?? '');
const asyncInputValue = ref<string | number | null>('');
const asyncDelayMs = ref(500);

async function fetchFrameworks(query: string) {
    await new Promise((resolve) => {
        window.setTimeout(resolve, asyncDelayMs.value);
    });

    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return [];
    }

    return frameworks.filter((framework) => framework.label.toLowerCase().includes(normalized));
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
        <ComboboxInput
            v-model="frameworkValue"
            :options="frameworks"
            placeholder="Select a framework"
        />

        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
            <Button type="button" :variant="asyncDelayMs === 500 ? 'primary' : 'outline'" @click="asyncDelayMs = 500">
                0.5s
            </Button>
            <Button type="button" :variant="asyncDelayMs === 3000 ? 'primary' : 'outline'" @click="asyncDelayMs = 3000">
                3s
            </Button>
            <span style="font-size: 12px; color: #64748b;">Current delay: {{ asyncDelayMs }}ms</span>
        </div>

        <ComboboxInput
            v-model="asyncInputValue"
            :fetch-options="fetchFrameworks"
            placeholder="Search frameworks"
            start-typing-message="Start typing to search frameworks…"
        />
    </div>
</template>
