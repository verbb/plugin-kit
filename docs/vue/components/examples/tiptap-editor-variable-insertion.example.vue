<script setup lang="ts">
import { ref } from 'vue';
import { TiptapEditor } from '@verbb/plugin-kit-vue/components';

const initialValue = JSON.stringify([
    {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Use the variable dropdown to insert dynamic values.' }],
    },
]);

const value = ref(initialValue);

const variableCategories = {
    emailVariables: [
        { label: 'User Email', value: '{userEmail}' },
        { label: 'System Email', value: '{systemEmail}' },
    ],
    plainTextVariables: [
        { label: 'Form Name', value: '{formName}' },
        { label: 'Timestamp', value: '{timestamp}' },
    ],
};

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 720px;">
        <TiptapEditor
            :value="value"
            placeholder="Insert variables"
            :buttons="['bold', 'italic', 'variableTag']"
            :variable-categories="variableCategories"
            @pk-change="onChange"
        />
    </div>
</template>
