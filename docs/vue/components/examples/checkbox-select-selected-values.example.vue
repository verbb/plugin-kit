<script setup lang="ts">
import { ref } from 'vue';
import { CheckboxSelect } from '@verbb/plugin-kit-vue/components';

type CheckboxSelectValue = string[] | '*';

const fruitOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
];

const value = ref<CheckboxSelectValue>(['apple', 'grapes']);

function onChange(event: CustomEvent<{ value: CheckboxSelectValue }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div class="text-sm">
        <h3 class="mb-2 text-sm font-bold">Select fruits</h3>
        <CheckboxSelect
            :options="fruitOptions"
            :value="value"
            :show-all-option="false"
            @pk-change="onChange"
        />
    </div>
</template>
