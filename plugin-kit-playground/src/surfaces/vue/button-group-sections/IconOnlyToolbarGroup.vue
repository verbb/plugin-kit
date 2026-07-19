<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <ButtonGroup>
    <GroupButton variant="primary" icon="pen" aria-label="Edit" />
    <GroupButton variant="primary" icon="eye" aria-label="Preview" />
    <GroupButton variant="primary" icon="download" aria-label="Export" />
  </ButtonGroup>
</template>
