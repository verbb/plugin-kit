<script setup lang="ts">
import {
    buttonMatrixSizes,
    buttonMatrixVariants,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-vue/components';
</script>

<template>
  <div v-for="{ label, size } in buttonMatrixSizes" :key="size">
    <h3 class="cmp-row-heading">{{ label }}</h3>
    <div class="cmp-row-items">
      <Button
        v-for="{ label: variantLabel, variant } in buttonMatrixVariants"
        :key="`${size}-${variant}`"
        :size="size"
        :variant="variant"
      >
        {{ variantLabel }}
      </Button>
    </div>
  </div>
</template>
