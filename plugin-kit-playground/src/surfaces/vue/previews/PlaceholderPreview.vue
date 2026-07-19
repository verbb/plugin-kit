<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="pg-page">
    <h2 class="pg-page__title">{{ title }}</h2>
    <p class="pg-placeholder__meta">Not implemented in plugin-kit-vue yet</p>
  </section>
</template>
