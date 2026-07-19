<script setup lang="ts">
import { dropdownMenuPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { dropdownMenuVueSectionComponents } from '../dropdown-menu-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="dropdownMenuPlaygroundSpec"
    :section-components="dropdownMenuVueSectionComponents"
  />
</template>
