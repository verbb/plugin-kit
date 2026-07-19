<script setup lang="ts">
import { ref } from 'vue';
import { EditableTable } from '@verbb/plugin-kit-vue/components';

const thinColumns = [
    { name: 'label', label: 'Option Label', type: 'text', required: true },
    { name: 'value', label: 'Value', type: 'text' },
    { name: 'isDefault', label: 'Default', type: 'checkbox', thin: true },
    { name: 'isDisabled', label: 'Disabled', type: 'checkbox', thin: true },
];

const radioColumns = [
    { name: 'label', label: 'Option Label', type: 'text', required: true },
    { name: 'value', label: 'Value', type: 'text' },
    { name: 'isDefault', label: 'Default (allow unselect)', type: 'radio', allowUnselect: true },
    { name: 'isDisabled', label: 'Disabled', type: 'checkbox' },
];

const thinRows = ref([
    { label: 'Some Text', value: 'Some Text', isDefault: false, isDisabled: false },
    { label: 'More Text', value: 'More Text', isDefault: false, isDisabled: false },
]);

const radioRows = ref([
    { label: 'Select an option', value: 'Select an option', isDefault: true, isDisabled: true },
    { label: 'Option 1', value: 'Option 1', isDefault: false, isDisabled: true },
    { label: 'Option 2', value: 'Option 2', isDefault: false, isDisabled: true },
]);

function onThinChange(event: CustomEvent<{ rows: typeof thinRows.value }>) {
    thinRows.value = event.detail.rows;
}

function onRadioChange(event: CustomEvent<{ rows: typeof radioRows.value }>) {
    radioRows.value = event.detail.rows;
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 24px;">
        <EditableTable
            :columns="thinColumns"
            :rows="thinRows"
            add-row-label="Add an option"
            @pk-change="onThinChange"
        />
        <EditableTable
            :columns="radioColumns"
            :rows="radioRows"
            add-row-label="Add an option"
            @pk-change="onRadioChange"
        />
    </div>
</template>
