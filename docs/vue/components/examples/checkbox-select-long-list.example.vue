<script setup lang="ts">
import { ref } from 'vue';
import { CheckboxSelect } from '@verbb/plugin-kit-vue/components';

type CheckboxSelectValue = string[] | '*';

const longOptions = [
    { label: 'Entry titles and slugs', value: 'titles' },
    { label: 'Author names', value: 'authors' },
    { label: 'Section and entry type metadata', value: 'sections' },
    { label: 'Submission status labels', value: 'statuses' },
    { label: 'Integration response summaries', value: 'integrations' },
    {
        label: 'Very long option label that should wrap cleanly without pushing the checkbox out of alignment',
        value: 'long',
    },
];

const value = ref<CheckboxSelectValue>(['titles', 'statuses']);

function onChange(event: CustomEvent<{ value: CheckboxSelectValue }>) {
    value.value = event.detail.value;
}
</script>

<template>
    <div class="max-w-sm text-sm">
        <CheckboxSelect
            class="space-y-2"
            :options="longOptions"
            :value="value"
            @pk-change="onChange"
        />
    </div>
</template>
