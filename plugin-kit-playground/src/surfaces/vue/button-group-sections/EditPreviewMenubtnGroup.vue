<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <ButtonGroup>
    <GroupButton label="Edit" variant="primary" icon="pen" />
    <GroupButton label="Preview" variant="primary" icon="eye" />
    <GroupButton variant="primary" aria-label="More actions" group-trigger />
  </ButtonGroup>
</template>
