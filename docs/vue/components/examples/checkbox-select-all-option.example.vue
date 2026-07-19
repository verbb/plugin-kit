<script setup lang="ts">
import { ref } from 'vue';
import { CheckboxSelect } from '@verbb/plugin-kit-vue/components';

/** Mirrors React `CheckboxSelectValue` — Vue facade does not re-export the type/`ALL_VALUE` yet. */
type CheckboxSelectValue = string[] | '*';

const formOptions = [
    { label: 'Contact Form', value: 'contact' },
    { label: 'Newsletter', value: 'newsletter' },
    { label: 'Support', value: 'support' },
];

const value = ref<CheckboxSelectValue>([]);

function onChange(event: CustomEvent<{ value: CheckboxSelectValue }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <CheckboxSelect
        :options="formOptions"
        :value="value"
        show-all-option
        all-label="All forms"
        @pk-change="onChange"
    />
</template>
