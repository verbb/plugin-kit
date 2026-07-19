<script setup lang="ts">
import { iconPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { iconVueSectionComponents } from '../icon-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="iconPlaygroundSpec"
    :section-components="iconVueSectionComponents"
  />
</template>
