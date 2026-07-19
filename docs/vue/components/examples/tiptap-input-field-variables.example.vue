<script setup lang="ts">
import { ref } from 'vue';
import { TiptapInput } from '@verbb/plugin-kit-vue/components';

const variableCategoryLabels = {
    plainTextFields: 'Fields',
};

const variableCategoryOrder = ['plainTextFields'];

const variableCategories = {
    plainTextFields: [
        { label: 'Name', value: '{field:name}' },
        { label: 'Email', value: '{field:email}' },
        { label: 'Message', value: '{field:message}' },
    ],
};

const value = ref('Name: {field:name}, Message: {field:message}');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 720px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #334155;">
                Calculation / field reference
            </label>
            <TiptapInput
                :value="value"
                :variable-categories="variableCategories"
                :variable-category-labels="variableCategoryLabels"
                :variable-category-order="variableCategoryOrder"
                placeholder="Insert form field variables"
                @pk-change="onChange"
            />
        </div>
    </div>
</template>
