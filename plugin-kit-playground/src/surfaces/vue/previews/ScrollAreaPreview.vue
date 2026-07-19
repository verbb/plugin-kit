<script setup lang="ts">
import { scrollAreaPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { scrollAreaVueSectionComponents } from '../scroll-area-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="scrollAreaPlaygroundSpec"
    :section-components="scrollAreaVueSectionComponents"
  />
</template>
