<script setup lang="ts">
import { ref } from 'vue';
import { TiptapInput } from '@verbb/plugin-kit-vue/components';

const variableCategoryLabels = {
    form: 'Form',
    general: 'General',
    site: 'Site',
};

const variableCategoryOrder = ['form', 'general', 'site'];

const variableCategories = {
    form: [
        { label: 'Form Name', value: '{form:name}' },
        { label: 'Form Handle', value: '{form:handle}' },
    ],
    general: [
        { label: 'Current Date', value: '{timestamp:dateUs}' },
        { label: 'Current Time', value: '{timestamp:time12}' },
    ],
    site: [
        { label: 'Current User Email', value: '{user:email}' },
        { label: 'Current User Full Name', value: '{user:fullName}' },
    ],
};

const value = ref('Hi {user:fullName}, your form {form:name} was submitted on {timestamp:dateUs}.');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 720px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #334155;">
                Notification subject
            </label>
            <TiptapInput
                :value="value"
                :variable-categories="variableCategories"
                :variable-category-labels="variableCategoryLabels"
                :variable-category-order="variableCategoryOrder"
                placeholder="Type or use + / @ for variables"
                @pk-change="onChange"
            />
        </div>
    </div>
</template>
