<script setup lang="ts">
import { tooltipPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { tooltipVueSectionComponents } from '../tooltip-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="tooltipPlaygroundSpec"
    :section-components="tooltipVueSectionComponents"
  />
</template>
