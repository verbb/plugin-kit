<script setup lang="ts">
import { ScrollArea } from '@verbb/plugin-kit-vue/components';

const items = ['Alpha', 'Beta', 'Gamma', 'Delta'];
</script>

<template>
    <ScrollArea orientation="horizontal" style="width: 16rem;">
        <div style="display: flex; gap: 8px; width: max-content; padding: 8px;">
            <div v-for="item in items" :key="item" style="min-width: 6rem;">
                {{ item }}
            </div>
        </div>
    </ScrollArea>
</template>
