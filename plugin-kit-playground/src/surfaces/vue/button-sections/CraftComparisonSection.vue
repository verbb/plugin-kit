<script setup lang="ts">
import {
    buttonMatrixStates,
    buttonMatrixVariants,
} from '@verbb/plugin-kit-playground';

import { Button } from '@verbb/plugin-kit-vue/components';

function craftStateMatrixHtml(): string {
    return `
        <div class="cmp-rows">
            ${buttonMatrixVariants.map(({ label, craftClassName }) => {
        const baseClass = craftClassName ? ` class="${craftClassName}"` : '';

        return `
                    <div class="cmp-row">
                        <h3 class="cmp-row-heading">${label}</h3>
                        <div class="cmp-row-items">
                            <button type="button"${baseClass}>Normal</button>
                            <button type="button"${baseClass}>Hover</button>
                            <button type="button"${baseClass}>Focus</button>
                            <button type="button"${craftClassName ? ` class="${craftClassName} active"` : ' class="active"'}>Active</button>
                            <button type="button"${craftClassName ? ` class="${craftClassName} disabled"` : ' class="disabled"'} disabled>Disabled</button>
                        </div>
                    </div>
                `;
    }).join('')}
        </div>
    `;
}
</script>

<template>
  <div class="cmp-layout">
    <div class="cmp-column">
      <span class="cmp-column-title">Plugin Kit</span>
      <div class="cmp-rows">
        <div v-for="entry in buttonMatrixVariants" :key="entry.label" class="cmp-row">
          <h3 class="cmp-row-heading">{{ entry.label }}</h3>
          <div class="cmp-row-items">
            <Button
              v-for="matrixState in buttonMatrixStates"
              :key="matrixState.label"
              :variant="entry.variant"
              :data-state="matrixState.state"
              :disabled="matrixState.disabled"
            >
              {{ matrixState.label }}
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="cmp-column">
      <span class="cmp-column-title">Craft</span>
      <div v-html="craftStateMatrixHtml()" />
    </div>
  </div>
</template>
