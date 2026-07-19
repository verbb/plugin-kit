<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <div class="pg-card__inner--row">
    <ButtonGroup>
      <GroupButton label="Save changes" variant="primary" />
      <GroupButton variant="primary" aria-label="Open save options" group-trigger />
    </ButtonGroup>
    <ButtonGroup>
      <GroupButton label="Export" variant="outline" icon="download" />
      <GroupButton variant="outline" aria-label="Open export options" group-trigger />
    </ButtonGroup>
  </div>
</template>
