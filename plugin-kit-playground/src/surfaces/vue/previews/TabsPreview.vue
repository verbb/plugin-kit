<script setup lang="ts">
import { tabsPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { tabsVueSectionComponents } from '../tabs-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="tabsPlaygroundSpec"
    :section-components="tabsVueSectionComponents"
  />
</template>
