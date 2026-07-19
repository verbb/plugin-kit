<script setup lang="ts">
import { separatorPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { separatorVueSectionComponents } from '../separator-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="separatorPlaygroundSpec"
    :section-components="separatorVueSectionComponents"
  />
</template>
