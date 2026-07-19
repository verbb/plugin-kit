import { computed, ref, watch } from 'vue';
import type { CodeBlockSource } from './codeBlocks';
import { resolveCodeBlocks } from './codeBlocks';

export function useCodeBlocks(source: Readonly<CodeBlockSource>) {
    const blocks = computed(() => resolveCodeBlocks(source));
    const activeIndex = ref(0);
    const activeBlock = computed(() => blocks.value[activeIndex.value] ?? null);
    const hasTabs = computed(() => blocks.value.length > 1);

    const setActiveIndex = (index: number) => {
        activeIndex.value = index;
    };

    watch(blocks, (nextBlocks) => {
        if (!nextBlocks.length || activeIndex.value >= nextBlocks.length) {
            activeIndex.value = 0;
        }
    });

    watch(() => [source.tabs, source.code], () => {
        activeIndex.value = 0;
    });

    return {
        blocks,
        activeIndex,
        activeBlock,
        hasTabs,
        setActiveIndex,
    };
}
