<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <ButtonGroup>
    <GroupButton label="Actions" />
    <GroupButton label="Edit" icon="pen" />
    <GroupButton label="Preview" icon="eye" />
    <GroupButton icon="chevron-down" aria-label="More actions" />
  </ButtonGroup>
</template>
