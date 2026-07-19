<script setup lang="ts">
import { CheckboxSelect } from '@verbb/plugin-kit-vue/components';

const fruitOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
];
</script>

<template>
    <div class="space-y-6">
        <div class="text-sm">
            <h3 class="mb-2 text-sm font-bold">Disabled - All selected</h3>
            <CheckboxSelect
                :options="fruitOptions"
                value="*"
                show-all-option
                disabled
            />
        </div>
        <div class="text-sm">
            <h3 class="mb-2 text-sm font-bold">Disabled - Some selected</h3>
            <CheckboxSelect
                :options="fruitOptions"
                :value="['apple', 'banana']"
                show-all-option
                disabled
            />
        </div>
    </div>
</template>
