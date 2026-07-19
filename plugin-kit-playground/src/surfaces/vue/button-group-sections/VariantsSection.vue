<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';

const buttonGroupVariantCoverage = ['primary', 'secondary', 'default', 'outline', 'dashed'] as const;
</script>

<template>
  <div class="pg-card__inner--stack">
    <div v-for="variant in buttonGroupVariantCoverage" :key="variant" class="pg-demo-stack">
      <div class="pg-spinner-size-label">{{ variant }}</div>
      <ButtonGroup>
        <GroupButton label="Edit" :variant="variant" icon="pen" />
        <GroupButton label="Preview" :variant="variant" icon="eye" />
        <GroupButton :variant="variant" aria-label="More actions" group-trigger />
      </ButtonGroup>
    </div>
  </div>
</template>
