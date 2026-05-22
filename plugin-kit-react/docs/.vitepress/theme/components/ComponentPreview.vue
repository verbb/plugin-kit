<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import ComponentCodeBlock from './ComponentCodeBlock.vue';
import type { NormalizedCodeBlock } from './codeBlocks';
import { resolvePreviewBlocks } from './previewSources';

const props = defineProps<{
    src: string | string[];
}>();

const route = useRoute();
const { site } = useData();
const blocks = ref<NormalizedCodeBlock[]>([]);
const activeIndex = ref(0);
const activeBlock = computed(() => blocks.value[activeIndex.value] ?? null);
const hasCodeBlocks = computed(() => blocks.value.some((block) => block.code.trim().length > 0));
const previewRenderer = typeof window === 'undefined'
    ? null
    : defineAsyncComponent(() => import('./PreviewRenderer.vue'));

let requestId = 0;

async function refreshPreviewBlocks() {
    const nextRequestId = ++requestId;
    const nextBlocks = await resolvePreviewBlocks(props.src, route.path, site.value.base);

    if (nextRequestId !== requestId) {
        return;
    }

    blocks.value = nextBlocks;
    activeIndex.value = 0;
}

onMounted(() => {
    // Preview modules are React apps with browser-only dependencies. Keep them out of
    // VitePress SSR so the docs build only evaluates the markdown/Vue shell.
    watch(() => [route.path, props.src, site.value.base], () => {
        void refreshPreviewBlocks();
    }, { immediate: true });
});

const setActiveIndex = (index: number) => {
    activeIndex.value = index;
};
</script>

<template>
    <div v-if="activeBlock?.render" class="component-preview">
        <component :is="previewRenderer" v-if="previewRenderer" :render="activeBlock.render" />

        <ComponentCodeBlock
            v-if="hasCodeBlocks"
            :blocks="blocks"
            :active-index="activeIndex"
            joined
            collapsible
            @update:active-index="setActiveIndex"
        />
    </div>

    <ComponentCodeBlock
        v-else-if="activeBlock"
        :blocks="blocks"
        :active-index="activeIndex"
        @update:active-index="setActiveIndex"
    />
</template>
