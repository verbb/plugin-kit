<script setup lang="ts">
import { buttonPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { buttonVueSectionComponents } from '../button-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="buttonPlaygroundSpec"
    :section-components="buttonVueSectionComponents"
  />
</template>
