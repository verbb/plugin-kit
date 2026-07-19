<script setup lang="ts">
import { ref } from 'vue';
import type { ToolbarNode } from '@verbb/plugin-kit-tiptap-core';
import { TiptapEditor } from '@verbb/plugin-kit-vue/components';

const groupedToolbar: ToolbarNode[] = [
    { type: 'group', group: { preset: 'headings', headingLevels: [1, 2, 3, 4] } },
    { type: 'group', group: { preset: 'formatting', headingLevels: [1, 2, 3, 4] } },
    { type: 'button', name: 'h2' },
    { type: 'separator' },
    { type: 'button', name: 'bold' },
    { type: 'button', name: 'italic' },
    { type: 'group', group: { preset: 'lists' } },
    { type: 'button', name: 'unordered-list' },
    { type: 'separator' },
    { type: 'group', group: { preset: 'align' } },
    { type: 'button', name: 'link' },
    { type: 'button', name: 'undo' },
    { type: 'button', name: 'redo' },
];

const initialValue = JSON.stringify([
    {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Grouped Toolbar Demo' }],
    },
    {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Use preset dropdowns or standalone buttons for the same actions.' }],
    },
]);

const value = ref(initialValue);

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 800px;">
        <TiptapEditor
            :value="value"
            placeholder="Try grouped toolbar controls"
            :toolbar="groupedToolbar"
            @pk-change="onChange"
        />
    </div>
</template>
