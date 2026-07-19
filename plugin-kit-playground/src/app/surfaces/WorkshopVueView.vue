<script setup lang="ts">
import { computed } from 'vue';

import { getSurfacePreview, placeholderPreview } from '../../surfaces/vue/previews.ts';

const props = defineProps<{
    componentId: string;
}>();

const activePreview = computed(() => getSurfacePreview(props.componentId) ?? {
    id: props.componentId,
    title: props.componentId,
    component: placeholderPreview,
});
</script>

<template>
  <div class="cp-preview" data-cp-preview="cp">
    <div id="main-content" class="content-pane">
      <component
        :is="activePreview.component"
        :component-id="componentId"
        :title="activePreview.title"
      />
    </div>
  </div>
</template>
