<script setup lang="ts">
import { ref } from 'vue';
import { Combobox } from '@verbb/plugin-kit-vue/components';

type AsyncOption = { value: string; label: string };

const fruits: AsyncOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'avocado', label: 'Avocado' },
    { value: 'banana', label: 'Banana' },
    { value: 'blackberry', label: 'Blackberry' },
    { value: 'blueberry', label: 'Blueberry' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'coconut', label: 'Coconut' },
    { value: 'grape', label: 'Grape' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'orange', label: 'Orange' },
    { value: 'peach', label: 'Peach' },
    { value: 'pear', label: 'Pear' },
    { value: 'pineapple', label: 'Pineapple' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'watermelon', label: 'Watermelon' },
];

const value = ref('apple');

async function fetchOptions(query: string) {
    await new Promise((resolve) => {
        window.setTimeout(resolve, 400);
    });

    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return [];
    }

    return fruits.filter((fruit) => fruit.label.toLowerCase().includes(normalized));
}
</script>

<template>
    <Combobox
        async
        clearable
        placeholder="Search fruits…"
        start-typing-message="Start typing to search fruits…"
        :value="value"
        :fetchOptions="fetchOptions"
        @pk-change="(event: CustomEvent<{ value: string }>) => { value = event.detail.value; }"
    />
</template>
