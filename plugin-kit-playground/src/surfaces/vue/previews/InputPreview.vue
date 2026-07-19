<script setup lang="ts">
import { inputPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { inputVueSectionComponents } from '../input-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="inputPlaygroundSpec"
    :section-components="inputVueSectionComponents"
  />
</template>
