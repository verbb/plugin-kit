<script setup lang="ts">
import type { ComponentRegistryEntry } from '@verbb/plugin-kit-playground';

import { vueBasicDemos } from '../basic-demos.js';

const props = defineProps<{
    entry: ComponentRegistryEntry;
}>();

const Demo = vueBasicDemos[props.entry.id];
</script>

<template>
  <div class="pg-page">
    <div class="pg-page__hero">
      <div class="pg-page__eyebrow">Components</div>
      <h1 class="pg-page__title">{{ entry.title }}</h1>
      <p class="pg-page__lead">{{ entry.description }}</p>
    </div>

    <div class="pg-sections">
      <section class="pg-section">
        <div class="pg-section__intro">
          <h2 class="pg-section__title">Basic usage</h2>
          <p class="pg-section__description">
            Vue facade over the matching <code>&lt;pk-{{ entry.id }}&gt;</code> web component.
          </p>
        </div>

        <div class="pg-card">
          <div class="pg-card__inner">
            <component :is="Demo" v-if="Demo" />
            <p v-else class="pg-placeholder__meta">Demo not wired yet</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
