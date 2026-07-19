<script setup lang="ts">
import { Button } from '@verbb/plugin-kit-vue/components';
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <ButtonGroup>
    <GroupButton label="Actions" variant="primary" />
    <pk-dropdown-menu id="bg-vue-dropdown-menu" placement="bottom-end">
      <Button slot="trigger" variant="primary" group-trigger aria-label="Open actions" />
      <pk-dropdown-item value="edit">Edit</pk-dropdown-item>
      <pk-dropdown-item value="duplicate">Duplicate</pk-dropdown-item>
      <pk-dropdown-separator></pk-dropdown-separator>
      <pk-dropdown-item value="delete" destructive>Delete</pk-dropdown-item>
    </pk-dropdown-menu>
  </ButtonGroup>
</template>
