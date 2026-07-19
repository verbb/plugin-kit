<script setup lang="ts">
import { tiptapContentPlaygroundSpec } from '@verbb/plugin-kit-playground';

import PlaygroundFromSpec from '../shared/PlaygroundFromSpec.vue';
import { tiptapContentVueSectionComponents } from '../tiptap-content-sections/index.js';
</script>

<template>
  <PlaygroundFromSpec
    :spec="tiptapContentPlaygroundSpec"
    :section-components="tiptapContentVueSectionComponents"
  />
</template>
