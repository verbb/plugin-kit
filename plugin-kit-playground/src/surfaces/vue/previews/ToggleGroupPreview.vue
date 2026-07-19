<script setup lang="ts">
import { toggleGroupPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { toggleGroupVueSectionComponents } from '../toggle-group-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="toggleGroupPlaygroundSpec"
    :section-components="toggleGroupVueSectionComponents"
  />
</template>
