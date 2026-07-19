<script setup lang="ts">
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <div class="pg-card__inner--stack">
    <ButtonGroup>
      <pk-input placeholder="Search forms..." style="width: 18rem" />
      <GroupButton label="Search" variant="outline" icon="search" />
    </ButtonGroup>

    <ButtonGroup>
      <select class="button-group-select" style="width: 11rem">
        <option value="draft" selected>Draft</option>
        <option value="review">In Review</option>
        <option value="published">Published</option>
      </select>
      <GroupButton label="Apply" variant="outline" />
    </ButtonGroup>

    <ButtonGroup>
      <pk-input-group style="width: 20rem">
        <pk-input-group-input placeholder="example.com/contact" />
        <pk-input-group-addon align="inline-start">
          <pk-input-group-text>https://</pk-input-group-text>
        </pk-input-group-addon>
        <pk-input-group-addon align="inline-end">
          <pk-input-group-button>Go</pk-input-group-button>
        </pk-input-group-addon>
      </pk-input-group>
      <GroupButton label="Validate" variant="outline" />
    </ButtonGroup>
  </div>
</template>
