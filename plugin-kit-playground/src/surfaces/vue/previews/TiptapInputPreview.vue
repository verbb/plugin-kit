<script setup lang="ts">
import { tiptapInputPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { tiptapInputVueSectionComponents } from '../tiptap-input-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="tiptapInputPlaygroundSpec"
    :section-components="tiptapInputVueSectionComponents"
  />
</template>
