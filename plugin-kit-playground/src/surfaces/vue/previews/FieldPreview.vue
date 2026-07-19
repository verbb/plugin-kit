<script setup lang="ts">
import { fieldPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { fieldVueSectionComponents } from '../field-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="fieldPlaygroundSpec"
    :section-components="fieldVueSectionComponents"
  />
</template>
