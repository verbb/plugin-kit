<script setup lang="ts">
import { Button } from '@verbb/plugin-kit-vue/components';
import { ButtonGroup } from '@verbb/plugin-kit-vue/components';

import GroupButton from './GroupButton.vue';
</script>

<template>
  <ButtonGroup>
    <GroupButton label="Filters" variant="outline" />
    <pk-popover id="bg-vue-popover" placement="bottom-start">
      <Button slot="trigger" variant="outline" group-trigger aria-label="Open filters" />
      <div>
        <div style="display: grid; gap: 4px">
          <strong style="font-size: 14px; color: #0f172a">Quick Filters</strong>
          <p style="margin: 0; font-size: 13px; color: #64748b">Refine visible rows before editing.</p>
        </div>
        <div style="margin-top: 12px; display: grid; gap: 8px; font-size: 14px; color: #475569">
          <div>Show Active Forms</div>
          <div>Show Forms With Submissions</div>
          <div>Show Archived Forms</div>
        </div>
      </div>
    </pk-popover>
  </ButtonGroup>
</template>
