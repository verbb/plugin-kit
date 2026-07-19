<script setup lang="ts">
import { radioGroupPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { radioGroupVueSectionComponents } from '../radio-group-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="radioGroupPlaygroundSpec"
    :section-components="radioGroupVueSectionComponents"
  />
</template>
