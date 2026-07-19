<script setup lang="ts">
import { comboboxPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { comboboxVueSectionComponents } from '../combobox-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="comboboxPlaygroundSpec"
    :section-components="comboboxVueSectionComponents"
  />
</template>
