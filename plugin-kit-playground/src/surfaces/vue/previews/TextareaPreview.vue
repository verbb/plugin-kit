<script setup lang="ts">
import { textareaPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { textareaVueSectionComponents } from '../textarea-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="textareaPlaygroundSpec"
    :section-components="textareaVueSectionComponents"
  />
</template>
