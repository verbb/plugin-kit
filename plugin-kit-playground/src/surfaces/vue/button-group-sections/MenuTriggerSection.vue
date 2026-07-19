<script setup lang="ts">
import ChevronIconSplitGroup from './ChevronIconSplitGroup.vue';
import EditPreviewMenubtnGroup from './EditPreviewMenubtnGroup.vue';
import IconOnlyToolbarGroup from './IconOnlyToolbarGroup.vue';
</script>

<template>
  <div class="pg-card__inner--stack">
    <div class="pg-demo-stack">
      <div class="pg-spinner-size-label">Split toolbar — label actions + compact chevron (`group-trigger`)</div>
      <EditPreviewMenubtnGroup />
    </div>
    <div class="pg-demo-stack">
      <div class="pg-spinner-size-label">Icon-only buttons — normal square controls (no `group-trigger`)</div>
      <IconOnlyToolbarGroup />
    </div>
    <div class="pg-demo-stack">
      <div class="pg-spinner-size-label">Avoid — chevron passed as `icon` keeps full button padding</div>
      <ChevronIconSplitGroup />
    </div>
    <div class="pg-demo-stack">
      <div class="pg-spinner-size-label">Use — `group-trigger` for the disclosure end-cap (Craft `.menubtn`)</div>
      <EditPreviewMenubtnGroup />
    </div>
  </div>
</template>
