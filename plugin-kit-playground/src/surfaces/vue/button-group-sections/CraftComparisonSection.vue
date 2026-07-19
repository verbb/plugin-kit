<script setup lang="ts">
import { buildCraftButtonGroupComparisonHtml, buttonGroupViewModeIcons } from '@verbb/plugin-kit-playground';

import EditPreviewMenubtnGroup from './EditPreviewMenubtnGroup.vue';
import GroupButton from './GroupButton.vue';
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';
</script>

<template>
  <div class="cmp-layout">
    <div class="cmp-column">
      <span class="cmp-column-title">Plugin Kit</span>
      <div class="cmp-rows">
        <div class="cmp-row">
          <h3 class="cmp-row-heading">Edit + Preview + menubtn</h3>
          <div class="cmp-row-items"><EditPreviewMenubtnGroup /></div>
        </div>
        <div class="cmp-row">
          <h3 class="cmp-row-heading">New entry + menubtn</h3>
          <div class="cmp-row-items">
            <ButtonGroup>
              <GroupButton label="New entry" variant="primary" icon="plus" />
              <GroupButton variant="primary" aria-label="New entry, choose a section" group-trigger />
            </ButtonGroup>
          </div>
        </div>
        <div class="cmp-row">
          <h3 class="cmp-row-heading">View mode (exclusive)</h3>
          <div class="cmp-row-items">
            <ButtonGroup exclusive aria-label="View">
              <GroupButton :icon="buttonGroupViewModeIcons.table" aria-label="Display in a table" :pressed="true" />
              <GroupButton :icon="buttonGroupViewModeIcons.cards" aria-label="Display as cards" :pressed="false" />
            </ButtonGroup>
          </div>
        </div>
        <div class="cmp-row">
          <h3 class="cmp-row-heading">Preview + View</h3>
          <div class="cmp-row-items">
            <ButtonGroup>
              <GroupButton label="Preview" icon="eye" />
              <GroupButton label="View" />
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
    <div class="cmp-column">
      <span class="cmp-column-title">Craft</span>
      <div class="cmp-craft-column" v-html="buildCraftButtonGroupComparisonHtml()" />
    </div>
  </div>
</template>
