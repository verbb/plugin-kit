<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';

const groupSizes = ['xs', 'sm', 'default', 'lg'] as const;
</script>

<template>
  <div class="pg-card__inner--row">
    <ButtonGroup v-for="size in groupSizes" :key="size">
      <GroupButton label="Edit" variant="outline" :size="size" />
      <GroupButton label="Preview" variant="outline" :size="size" />
      <GroupButton variant="outline" :size="size" :aria-label="`More ${size} actions`" group-trigger />
    </ButtonGroup>
  </div>
</template>
