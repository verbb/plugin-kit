<script setup lang="ts">
import { ref } from 'vue';
import { TiptapInput } from '@verbb/plugin-kit-vue/components';

const variableCategoryLabels = {
    emailFields: 'Fields',
    general: 'General',
    site: 'Site',
};

const toAddressVariableCategoryOrder = ['emailFields', 'general', 'site'];
const replyToVariableCategoryOrder = ['emailFields'];

const toAddressVariableCategories = {
    emailFields: [
        { label: 'Email Field', value: '{field:email}' },
        { label: 'Recipients Field', value: '{field:recipients}' },
    ],
    general: [
        { label: 'System Email', value: '{system:email}' },
        { label: 'System Reply-To', value: '{system:replyTo}' },
    ],
    site: [{ label: 'Current User Email', value: '{user:email}' }],
};

const replyToVariableCategories = {
    emailFields: [
        { label: 'Email Field', value: '{field:email}' },
        { label: 'Hidden Email', value: '{field:hiddenEmail}' },
    ],
};

const toAddress = ref('{user:email}');
const replyToAddress = ref('{field:email}');

function onToChange(event: CustomEvent<{ value: string }>) {
    toAddress.value = event.detail.value;
}

function onReplyToChange(event: CustomEvent<{ value: string }>) {
    replyToAddress.value = event.detail.value;
}
</script>

<template>
    <div style="max-width: 720px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #334155;">To</label>
            <TiptapInput
                :value="toAddress"
                :variable-categories="toAddressVariableCategories"
                :variable-category-labels="variableCategoryLabels"
                :variable-category-order="toAddressVariableCategoryOrder"
                placeholder="Insert email variable"
                @pk-change="onToChange"
            />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #334155;">Reply-To</label>
            <TiptapInput
                :value="replyToAddress"
                :variable-categories="replyToVariableCategories"
                :variable-category-labels="variableCategoryLabels"
                :variable-category-order="replyToVariableCategoryOrder"
                placeholder="Insert email field variable"
                @pk-change="onReplyToChange"
            />
        </div>
    </div>
</template>
