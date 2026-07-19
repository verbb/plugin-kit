<script setup lang="ts">
import { datePickerPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { datePickerVueSectionComponents } from '../date-picker-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="datePickerPlaygroundSpec"
    :section-components="datePickerVueSectionComponents"
  />
</template>
