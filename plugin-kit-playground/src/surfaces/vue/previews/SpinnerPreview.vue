<script setup lang="ts">
import { spinnerPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { spinnerVueSectionComponents } from '../spinner-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="spinnerPlaygroundSpec"
    :section-components="spinnerVueSectionComponents"
  />
</template>
