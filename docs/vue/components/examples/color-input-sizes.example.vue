<script setup lang="ts">
import { reactive } from 'vue';
import { ColorInput } from '@verbb/plugin-kit-vue/components';

const sizes = ['xs', 'sm', 'default', 'lg', 'xl'] as const;
type ColorSize = (typeof sizes)[number];

const values = reactive(
    Object.fromEntries(sizes.map((size) => [size, '#35e533'])) as Record<ColorSize, string>,
);

function onChange(size: ColorSize) {
    return (event: CustomEvent<{ value: string }>) => {
        values[size] = event.detail.value;
    };
}
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 12px;">
        <div
            v-for="size in sizes"
            :key="size"
            style="display: flex; align-items: center; gap: 16px;"
        >
            <div style="width: 64px; font-size: 12px; color: #64748b;">
                {{ size }}
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <ColorInput
                    :value="values[size]"
                    :size="size"
                    @pk-change="onChange(size)"
                />
                <div style="font-size: 11px; color: #4b5563;">
                    Value: <code>{{ values[size] || '(empty)' }}</code>
                </div>
            </div>
        </div>
    </div>
</template>
