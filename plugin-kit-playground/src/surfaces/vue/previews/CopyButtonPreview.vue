<script setup lang="ts">
import { copyButtonPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { copyButtonVueSectionComponents } from '../copy-button-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="copyButtonPlaygroundSpec"
    :section-components="copyButtonVueSectionComponents"
  />
</template>
