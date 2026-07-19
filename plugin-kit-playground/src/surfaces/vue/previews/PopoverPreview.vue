<script setup lang="ts">
import { popoverPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { popoverVueSectionComponents } from '../popover-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="popoverPlaygroundSpec"
    :section-components="popoverVueSectionComponents"
  />
</template>
