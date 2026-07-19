<script setup lang="ts">
import { statusPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { statusVueSectionComponents } from '../status-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="statusPlaygroundSpec"
    :section-components="statusVueSectionComponents"
  />
</template>
