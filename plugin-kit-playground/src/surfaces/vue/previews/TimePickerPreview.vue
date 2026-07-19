<script setup lang="ts">
import { timePickerPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { timePickerVueSectionComponents } from '../time-picker-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="timePickerPlaygroundSpec"
    :section-components="timePickerVueSectionComponents"
  />
</template>
