<script setup lang="ts">
import { checkboxPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { checkboxVueSectionComponents } from '../spec-sections.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="checkboxPlaygroundSpec"
    :section-components="checkboxVueSectionComponents"
  />
</template>
