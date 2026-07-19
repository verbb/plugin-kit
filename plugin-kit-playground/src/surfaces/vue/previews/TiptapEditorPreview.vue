<script setup lang="ts">
import { tiptapEditorPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { tiptapEditorVueSectionComponents } from '../tiptap-editor-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="tiptapEditorPlaygroundSpec"
    :section-components="tiptapEditorVueSectionComponents"
  />
</template>
