<script setup lang="ts">
import { ref } from 'vue';
import { TiptapInput } from '@verbb/plugin-kit-vue/components';

const variableCategoryLabels = {
    fieldsWithSelectors: 'Fields',
    form: 'Form',
    general: 'General',
    site: 'Site',
};

const variableCategoryOrder = ['fieldsWithSelectors', 'form', 'general', 'site'];

const variableCategories = {
    fieldsWithSelectors: [
        {
            label: 'Name Field',
            children: [
                { label: 'Full Name', value: '{field:contactName:__toString}', group: 'selector' },
                { label: 'First Name', value: '{field:contactName:firstName}', group: 'selector' },
                { label: 'Last Name', value: '{field:contactName:lastName}', group: 'selector' },
            ],
        },
        {
            label: 'Address Field',
            children: [
                { label: 'Address', value: '{field:address:__toString}', group: 'selector' },
                { label: 'City', value: '{field:address:city}', group: 'selector' },
                { label: 'ZIP / Postal Code', value: '{field:address:zip}', group: 'selector' },
            ],
        },
        {
            label: 'Dropdown Field',
            children: [
                { label: 'Dropdown Label', value: '{field:dropdown:label}', group: 'selector' },
                { label: 'Dropdown Value', value: '{field:dropdown:value}', group: 'selector' },
            ],
        },
    ],
    form: [{ label: 'Form Name', value: '{form:name}' }],
    general: [{ label: 'Current Date', value: '{timestamp:dateUs}' }],
    site: [{ label: 'Current User Email', value: '{user:email}' }],
};

const value = ref('Contact: {field:contactName} at {field:address:city}');

function onChange(event: CustomEvent<{ value: string }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 720px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #334155;">
                Notification
            </label>
            <TiptapInput
                :value="value"
                :variable-categories="variableCategories"
                :variable-category-labels="variableCategoryLabels"
                :variable-category-order="variableCategoryOrder"
                placeholder="Use + or @ to pick; click parents for child selectors"
                @pk-change="onChange"
            />
        </div>
    </div>
</template>
