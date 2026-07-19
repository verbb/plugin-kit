<script setup lang="ts">
import { dialogPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { dialogVueSectionComponents } from '../dialog-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="dialogPlaygroundSpec"
    :section-components="dialogVueSectionComponents"
  />
</template>
