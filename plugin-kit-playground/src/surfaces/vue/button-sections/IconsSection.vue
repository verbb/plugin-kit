<script setup lang="ts">
import {
    buttonIconPlacementExamples,
    buttonIconSections,
    buttonMatrixSizes,
    buttonMatrixVariants,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-vue/components';
import { Icon } from '@verbb/plugin-kit-vue/components';

const labelIconVariations = [
    { title: 'Icon with label by size (search)', icon: 'search' },
    { title: 'Icon with label by size (download)', icon: 'download' },
    { title: 'Icon with label by size (pen)', icon: 'pen' },
] as const;
</script>

<template>
  <div v-for="section in buttonIconSections" :key="section.id">
    <h3 class="cmp-row-heading">{{ section.title }}</h3>
    <div class="cmp-row-items">
      <template v-if="section.bySize">
        <Button
          v-for="{ label, size } in buttonMatrixSizes"
          :key="`${section.id}-${size}`"
          :size="size"
          :aria-label="section.withLabel ? undefined : label"
        >
          <Icon slot="start" :icon="section.withLabel ? 'plus' : 'eye'" />
          <template v-if="section.withLabel">{{ label }}</template>
        </Button>
      </template>
      <template v-else>
        <Button
          v-for="{ label, variant } in buttonMatrixVariants"
          :key="`${section.id}-${variant}`"
          :variant="variant"
          :aria-label="section.withLabel ? undefined : label"
        >
          <Icon slot="start" :icon="section.withLabel ? 'plus' : 'eye'" />
          <template v-if="section.withLabel">{{ label }}</template>
        </Button>
      </template>
    </div>
  </div>

  <div>
    <h3 class="cmp-row-heading">Icon placement</h3>
    <div class="cmp-row-items">
      <Button
        v-for="example in buttonIconPlacementExamples"
        :key="example.id"
        :aria-label="'ariaLabel' in example ? example.ariaLabel : undefined"
      >
        <Icon v-if="'startSlot' in example && example.startSlot === 'add'" slot="start" icon="plus" />
        <Icon v-if="'startSlot' in example && example.startSlot === 'eye'" slot="start" icon="eye" />
        <Icon v-if="'endSlot' in example && example.endSlot === 'eye'" slot="end" icon="eye" />
        <Icon v-if="'endSlot' in example && example.endSlot === 'chevron'" slot="end" icon="chevron-down" />
        <template v-if="'label' in example">{{ example.label }}</template>
      </Button>
    </div>
  </div>

  <div v-for="{ title, icon } in labelIconVariations" :key="title">
    <h3 class="cmp-row-heading">{{ title }}</h3>
    <div class="cmp-row-items">
      <Button v-for="{ label, size } in buttonMatrixSizes" :key="`${title}-${size}`" :size="size">
        <Icon slot="start" :icon="icon" />
        {{ label }}
      </Button>
    </div>
  </div>

  <div>
    <h3 class="cmp-row-heading">Caret by size</h3>
    <div class="cmp-row-items">
      <Button v-for="{ label, size } in buttonMatrixSizes" :key="`caret-${size}`" :size="size" with-caret>
        {{ label }}
      </Button>
    </div>
  </div>

  <div>
    <h3 class="cmp-row-heading">Icon &amp; caret by size</h3>
    <div class="cmp-row-items">
      <Button
        v-for="{ label, size } in buttonMatrixSizes"
        :key="`icon-caret-size-${size}`"
        :size="size"
        with-caret
      >
        <Icon slot="start" icon="plus" />
        {{ label }}
      </Button>
    </div>
  </div>

  <div>
    <h3 class="cmp-row-heading">Icon &amp; caret</h3>
    <div class="cmp-row-items">
      <Button
        v-for="{ label, variant } in buttonMatrixVariants"
        :key="`icon-caret-${variant}`"
        :variant="variant"
        with-caret
      >
        <Icon slot="start" icon="plus" />
        {{ label }}
      </Button>
    </div>
  </div>
</template>
