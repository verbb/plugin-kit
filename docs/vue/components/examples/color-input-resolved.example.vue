<script setup lang="ts">
import { reactive } from 'vue';
import { ColorInput } from '@verbb/plugin-kit-vue/components';

const values = reactive({
    empty: '',
    short: '#a9',
    medium: '#9c4',
    full: '#35e533',
    invalid: '#35e533',
    disabled: '#35e533',
});

type ValueKey = keyof typeof values;

function onChange(key: ValueKey) {
    return (event: CustomEvent<{ value: string }>) => {
        values[key] = event.detail.value;
    };
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 420px;">
        <ColorInput :value="values.empty" @pk-change="onChange('empty')" />
        <ColorInput :value="values.short" @pk-change="onChange('short')" />
        <ColorInput :value="values.medium" @pk-change="onChange('medium')" />
        <ColorInput :value="values.full" @pk-change="onChange('full')" />
        <ColorInput :value="values.invalid" invalid @pk-change="onChange('invalid')" />
        <ColorInput :value="values.disabled" disabled @pk-change="onChange('disabled')" />
    </div>
</template>
