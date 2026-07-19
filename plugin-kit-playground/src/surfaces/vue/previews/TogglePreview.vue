<script setup lang="ts">
import { togglePlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { toggleVueSectionComponents } from '../toggle-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="togglePlaygroundSpec"
    :section-components="toggleVueSectionComponents"
  />
</template>
