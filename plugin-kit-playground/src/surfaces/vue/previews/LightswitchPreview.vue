<script setup lang="ts">
import { lightswitchPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { lightswitchVueSectionComponents } from '../lightswitch-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="lightswitchPlaygroundSpec"
    :section-components="lightswitchVueSectionComponents"
  />
</template>
