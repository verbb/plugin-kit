<script setup lang="ts">
import { selectPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { selectVueSectionComponents } from '../select-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="selectPlaygroundSpec"
    :section-components="selectVueSectionComponents"
  />
</template>
