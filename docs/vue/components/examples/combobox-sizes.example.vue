<script setup lang="ts">
import { Combobox, Option } from '@verbb/plugin-kit-vue/components';

const fruits = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'grapes', label: 'Grapes' },
    { value: 'pineapple', label: 'Pineapple' },
];

const comboboxSizes = [
    { label: 'Extra small', size: 'xs' as const },
    { label: 'Small', size: 'sm' as const },
    { label: 'Default', size: 'default' as const },
    { label: 'Large', size: 'lg' as const },
];
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div
            v-for="{ label, size } in comboboxSizes"
            :key="size"
            style="display: flex; align-items: center; gap: 12px;"
        >
            <div style="width: 96px; font-size: 12px; color: #64748b;">
                {{ label }}
            </div>
            <Combobox
                :size="size === 'default' ? undefined : size"
                placeholder="Select a fruit"
                value="apple"
            >
                <Option
                    v-for="fruit in fruits"
                    :key="fruit.value"
                    :value="fruit.value"
                >
                    {{ fruit.label }}
                </Option>
            </Combobox>
        </div>
    </div>
</template>
