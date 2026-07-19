<script setup lang="ts">
import { buttonGroupPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { buttonGroupVueSectionComponents } from '../button-group-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="buttonGroupPlaygroundSpec"
    :section-components="buttonGroupVueSectionComponents"
  />
</template>
