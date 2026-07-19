<script setup lang="ts">
import { checkboxSelectPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { checkboxSelectVueSectionComponents } from '../spec-sections.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="checkboxSelectPlaygroundSpec"
    :section-components="checkboxSelectVueSectionComponents"
  />
</template>
