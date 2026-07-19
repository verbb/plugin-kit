<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import EditPreviewMenubtnGroup from './EditPreviewMenubtnGroup.vue';
import GroupButton from './GroupButton.vue';
</script>

<template>
  <div class="pg-card__inner--stack">
    <div class="pg-demo-stack">
      <div class="pg-spinner-size-label">On (default) — 1px divider between controls</div>
      <EditPreviewMenubtnGroup />
    </div>
    <div class="pg-demo-stack">
      <div class="pg-spinner-size-label">Off (`separators="false"`) — flush join</div>
      <ButtonGroup :separators="false">
        <GroupButton label="Edit" variant="primary" icon="pen" />
        <GroupButton label="Preview" variant="primary" icon="eye" />
        <GroupButton variant="primary" aria-label="More actions" group-trigger />
      </ButtonGroup>
    </div>
  </div>
</template>
