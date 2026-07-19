<script setup lang="ts">
import { Combobox, Option } from '@verbb/plugin-kit-vue/components';
</script>

<template>
    <Combobox placeholder="Select a framework">
        <Option value="next-js">Next.js</Option>
        <Option value="sveltekit">SvelteKit</Option>
        <Option value="nuxt-js">Nuxt.js</Option>
        <Option value="remix">Remix</Option>
        <Option value="astro">Astro</Option>
    </Combobox>
</template>
