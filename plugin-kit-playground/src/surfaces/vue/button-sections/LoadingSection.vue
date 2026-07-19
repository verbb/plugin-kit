<script setup lang="ts">
import {
    buttonLoadingSections,
    buttonLoadingSpinnerSections,
    buttonMatrixSizes,
    buttonMatrixVariants,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-vue/components';
</script>

<template>
  <div v-for="section in buttonLoadingSections" :key="section.id">
    <h3 class="cmp-row-heading">{{ section.title }}</h3>
    <div class="cmp-row-items">
      <template v-if="'buttons' in section && section.buttons">
        <Button
          v-for="buttonOptions in section.buttons"
          :key="`${section.id}-${buttonOptions.label}`"
          :variant="buttonOptions.variant"
          loading
          :data-state="'state' in buttonOptions ? buttonOptions.state : undefined"
          :disabled="'disabled' in buttonOptions ? buttonOptions.disabled : undefined"
        >
          {{ buttonOptions.label }}
        </Button>
      </template>
      <template v-else-if="'fromMatrix' in section && section.fromMatrix === 'variants'">
        <Button
          v-for="{ label, variant } in buttonMatrixVariants"
          :key="`${section.id}-${variant}`"
          loading
          :variant="variant"
        >
          {{ label }}
        </Button>
      </template>
      <template v-else-if="'fromMatrix' in section && section.fromMatrix === 'primarySizes'">
        <Button
          v-for="{ label, size } in buttonMatrixSizes"
          :key="`${section.id}-${size}`"
          loading
          variant="primary"
          :size="size"
        >
          {{ label }}
        </Button>
      </template>
    </div>
  </div>

  <div v-for="section in buttonLoadingSpinnerSections" :key="section.id">
    <h3 class="cmp-row-heading">{{ section.title }}</h3>
    <div class="cmp-row-items">
      <Button
        v-for="buttonOptions in section.buttons"
        :key="buttonOptions.label"
        :variant="buttonOptions.variant"
        loading
      >
        {{ buttonOptions.label }}
      </Button>
    </div>
  </div>
</template>
