<script setup lang="ts">
import { computed, ref } from 'vue';
import CodeBlockRenderer from './CodeBlockRenderer.vue';
import type { CodeBlockSource, NormalizedCodeBlock } from './codeBlocks';
import { useCodeBlocks } from './useCodeBlocks';

const props = withDefaults(defineProps<CodeBlockSource & {
    blocks?: NormalizedCodeBlock[];
    activeIndex?: number;
    joined?: boolean;
    collapsible?: boolean;
}>(), {
    language: 'tsx',
    lines: false,
    wrap: false,
    joined: false,
    collapsible: false,
});

const emit = defineEmits<{
    'update:activeIndex': [index: number];
}>();

const sourceState = useCodeBlocks(props);
const localActiveIndex = ref(0);

const blocks = computed(() => props.blocks ?? sourceState.blocks.value);
const activeIndex = computed(() => {
    if (props.blocks) {
        return props.activeIndex ?? localActiveIndex.value;
    }

    return sourceState.activeIndex.value;
});
const activeBlock = computed(() => blocks.value[activeIndex.value] ?? null);

const setActiveIndex = (index: number) => {
    if (props.blocks) {
        if (props.activeIndex === undefined) {
            localActiveIndex.value = index;
        }
    } else {
        sourceState.setActiveIndex(index);
    }

    emit('update:activeIndex', index);
};
</script>

<template>
    <CodeBlockRenderer
        v-if="activeBlock"
        :blocks="blocks"
        :active-index="activeIndex"
        :joined="joined"
        :collapsible="collapsible"
        @update:active-index="setActiveIndex"
    />
</template>
