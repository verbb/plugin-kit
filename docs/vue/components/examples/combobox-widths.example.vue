<script setup lang="ts">
import { Combobox, Option } from '@verbb/plugin-kit-vue/components';

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
];
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <Combobox placeholder="Select a fruit" style="width: 100%; max-width: 20rem;">
            <Option
                v-for="fruit in fruits"
                :key="fruit.value"
                :value="fruit.value"
            >
                {{ fruit.label }}
            </Option>
        </Combobox>
        <Combobox placeholder="Select a fruit" style="width: 12rem;">
            <Option
                v-for="fruit in fruits"
                :key="fruit.value"
                :value="fruit.value"
            >
                {{ fruit.label }}
            </Option>
        </Combobox>
    </div>
</template>
