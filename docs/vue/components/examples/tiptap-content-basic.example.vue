<script setup lang="ts">
import { TiptapContent } from '@verbb/plugin-kit-vue/components';

const value = [
    {
        type: 'paragraph',
        content: [
            { type: 'text', text: 'Preview ' },
            { type: 'text', marks: [{ type: 'bold' }], text: 'content' },
            { type: 'text', text: ' without a toolbar.' },
        ],
    },
];
</script>

<template>
    <TiptapContent :value="value" />
</template>
