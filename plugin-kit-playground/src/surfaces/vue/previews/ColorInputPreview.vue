<script setup lang="ts">
import { colorInputPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { colorInputVueSectionComponents } from '../color-input-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="colorInputPlaygroundSpec"
    :section-components="colorInputVueSectionComponents"
  />
</template>
