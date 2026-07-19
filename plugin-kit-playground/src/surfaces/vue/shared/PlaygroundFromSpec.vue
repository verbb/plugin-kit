<script setup lang="ts">
import type { Component } from 'vue';
import type { PlaygroundSpec } from '@verbb/plugin-kit-playground';

defineProps<{
    spec: PlaygroundSpec;
    sectionComponents: Record<string, Component>;
}>();
</script>

<template>
  <div class="pg-page">
    <div class="pg-page__hero">
      <div class="pg-page__eyebrow">{{ spec.meta.eyebrow }}</div>
      <h1 class="pg-page__title">{{ spec.meta.title }}</h1>
      <p class="pg-page__lead">{{ spec.meta.description }}</p>
    </div>

    <div class="pg-sections">
      <section v-for="section in spec.sections" :key="section.id" class="pg-section">
        <div class="pg-section__intro">
          <h2 class="pg-section__title">{{ section.title }}</h2>
          <p class="pg-section__description">{{ section.description }}</p>
        </div>

        <div class="pg-section__preview" :data-section-id="section.id">
          <component
            :is="sectionComponents[section.id]"
            v-if="section.bare && sectionComponents[section.id]"
          />
          <div
            v-else-if="sectionComponents[section.id]"
            :class="section.overflowVisible ? 'pg-card pg-card--overflow-visible' : 'pg-card'"
          >
            <div class="pg-card__inner">
              <component :is="sectionComponents[section.id]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
