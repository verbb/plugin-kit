<script setup lang="ts">
import { ref } from 'vue';
import { TiptapEditor } from '@verbb/plugin-kit-vue/components';

const advancedButtons = [
    'h1',
    'h2',
    'h3',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'unordered-list',
    'ordered-list',
    'blockquote',
    'code',
    'code-block',
    'link',
    'table',
    'variableTag',
    'undo',
    'redo',
];

const initialValue = JSON.stringify([
    {
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: 'Kitchen Sink Demo' }],
    },
    {
        type: 'paragraph',
        content: [
            { type: 'text', text: 'This editor exposes more advanced formatting options including ' },
            {
                type: 'text',
                marks: [{ type: 'link', attrs: { href: 'https://verbb.io' } }],
                text: 'links',
            },
            { type: 'text', text: ', tables, code blocks, and variables. Click a link to edit or unlink it.' },
        ],
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
            placeholder="Try all the formatting options"
            :buttons="advancedButtons"
            @pk-change="onChange"
        />
    </div>
</template>
