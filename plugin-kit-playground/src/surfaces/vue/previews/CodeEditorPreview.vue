<script setup lang="ts">
import { codeEditorPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { codeEditorVueSectionComponents } from '../code-editor-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="codeEditorPlaygroundSpec"
    :section-components="codeEditorVueSectionComponents"
  />
</template>
