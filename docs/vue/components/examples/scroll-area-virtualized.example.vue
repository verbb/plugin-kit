<script setup lang="ts">
import { ScrollArea } from '@verbb/plugin-kit-vue/components';

const rows = Array.from({ length: 20 }, (_, index) => `Row ${index + 1}`);
</script>

<template>
    <ScrollArea style="height: 10rem; width: 18rem;">
        <div style="padding: 8px; display: flex; flex-direction: column; gap: 6px;">
            <div v-for="row in rows" :key="row">
                {{ row }}
            </div>
        </div>
    </ScrollArea>
</template>
