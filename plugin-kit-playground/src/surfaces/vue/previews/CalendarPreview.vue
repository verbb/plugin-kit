<script setup lang="ts">
import { calendarPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { calendarVueSectionComponents } from '../spec-sections.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="calendarPlaygroundSpec"
    :section-components="calendarVueSectionComponents"
  />
</template>
