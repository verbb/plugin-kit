<script setup lang="ts">
import { ref } from 'vue';
import { TiptapEditor } from '@verbb/plugin-kit-vue/components';

const basicButtons = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'h2', 'unordered-list', 'ordered-list'];

const initialValue = JSON.stringify([
    {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Hello from the editor.' }],
    },
]);

const value = ref(initialValue);

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 720px;">
        <TiptapEditor
            :value="value"
            placeholder="Write something"
            :buttons="basicButtons"
            @pk-change="onChange"
        />
    </div>
</template>
