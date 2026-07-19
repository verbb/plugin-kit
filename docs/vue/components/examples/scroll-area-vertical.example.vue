<script setup lang="ts">
import { ScrollArea } from '@verbb/plugin-kit-vue/components';

const simpleItems = Array.from({ length: 8 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
    <ScrollArea orientation="vertical" style="height: 8rem; width: 16rem;">
        <div style="padding: 8px; display: flex; flex-direction: column; gap: 8px;">
            <div v-for="item in simpleItems" :key="item">
                {{ item }}
            </div>
        </div>
    </ScrollArea>
</template>
