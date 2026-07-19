<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <ButtonGroup orientation="vertical">
    <GroupButton label="First" variant="outline" />
    <GroupButton label="Second" variant="outline" />
    <GroupButton label="Third" variant="outline" />
  </ButtonGroup>
</template>
